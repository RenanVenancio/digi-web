import React, { useState, useContext, useEffect } from "react";
import ProductCartList from "../../Components/ProductCartList";
import ClientForm from "../../Components/ClientForm";
import DeliveryFormData from "../../Components/DeliveryFormData";
import OrderSummary from "../../Components/OrderSummary";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api } from "../../Services/Api";
import {
  ProgressIndicator,
  ProgressStep,
  Button,
  RenderIf,
  Card,
} from "react-rainbow-components";
import ContextLoader from "../../Components/ContextLoader";

export default function FinishOrder(props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [nextStepDisabled, setNextStepDisabled] = useState();
  const { setCompany, clientCheckoutData, checkoutProducts } = useContext(
    ApplicationContext
  );

  const stepNames = ["step-1", "step-2", "step-3", "step-4"];

  useEffect(() => {
    setCompany(props.match.params.company);
  }, [props, setCompany]);

  const verifyNextStep = () => {
    if (stepIndex === 0 && checkoutProducts.products.length > 0) {
      setNextStepDisabled(false);
    } else if (stepIndex === 1 && clientCheckoutData.clientDataIsValid) {
      setNextStepDisabled(false);
    } else if (
      stepIndex === 2 &&
      clientCheckoutData.deliveryDataIsValid === true
    ) {
      setNextStepDisabled(false);
    } else {
      setNextStepDisabled(true);
    }
  };

  const submitOrder = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    let orderStructure = {
      observation: "",
      client: {
        id: null,
        name: clientCheckoutData.clientData.name,
        email: clientCheckoutData.clientData.email,
        phone: clientCheckoutData.clientData.phone,
      },
      address: {
        street: clientCheckoutData.deliveryData.street,
        neighborhood: clientCheckoutData.deliveryData.neighborhood,
        complement: clientCheckoutData.deliveryData.complement,
        zipcode: clientCheckoutData.deliveryData.zipcode,
        city: "fas",
        state: "PB",
        deliveryArea: clientCheckoutData.deliveryData.deliveryArea,
      },
      itens: checkoutProducts.products,
      discount: "0.00",
      freightCost: clientCheckoutData.deliveryData.freightCost,
      delivery: clientCheckoutData.deliveryData.delivery,
      paymentMethod: clientCheckoutData.deliveryData.paymentMethod,
      change: clientCheckoutData.deliveryData.change,
    };
    console.log(orderStructure);
    await Api.post(
      `${props.match.params.company}/order/`,
      {
        observation: "",
        client: {
          id: null,
          name: clientCheckoutData.clientData.name,
          email: clientCheckoutData.clientData.email,
          phone: clientCheckoutData.clientData.phone,
        },
        address: {
          street: clientCheckoutData.deliveryData.street,
          neighborhood: clientCheckoutData.deliveryData.neighborhood,
          complement: clientCheckoutData.deliveryData.complement,
          zipcode: "58340000",
          city: "fas",
          state: "PB",
          deliveryArea: clientCheckoutData.deliveryData.deliveryArea,
        },
        itens: checkoutProducts.products.map((p) => {
          return {
            product: p.id,
            quantity: p.quantity,
            observation: p.observation,
          };
        }),
        discount: "0.00",
        freightCost: clientCheckoutData.deliveryData.freightCost,
        delivery: true,
        paymentMethod: clientCheckoutData.deliveryData.paymentMethod,
        change: clientCheckoutData.deliveryData.change,
      },
      options
    )
      .then((result) => {
        console.log(result);
        alert("feito");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    verifyNextStep();
  }, [checkoutProducts, stepIndex, verifyNextStep]);

  useEffect(() => {
    verifyNextStep();
  }, [clientCheckoutData, stepIndex, verifyNextStep]);

  const cardStyle = {
    width: "90%",
    height: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const isBackDisabled = () => {
    if (stepIndex > 0 && stepIndex < stepNames.length) {
      return false;
    }
    return true;
  };

  const isLastStep = () => {
    if (stepIndex < stepNames.length - 1 && stepIndex >= 0) {
      return false;
    }
    return true;
  };

  const handleNextClick = () => {
    if (stepIndex < stepNames.length - 1) {
      const nextStepIndex = stepIndex + 1;
      setNextStepDisabled(true);
      setStepIndex(nextStepIndex);
    }
  };

  const handleBackClick = () => {
    if (stepIndex > 0) {
      const previewStepIndex = stepIndex - 1;
      setStepIndex(previewStepIndex);
    }
  };

  return (
    <>
      <ContextLoader company={props.match.params.company} />
      <div className="rainbow-m-bottom_large rainbow-m-top_xx-large rainbow-p-bottom_large">
        <div>
          <ProgressIndicator
            currentStepName={stepNames[stepIndex]}
            variant="numeric"
          >
            <ProgressStep name="step-1" label="Seus Itens" />
            <ProgressStep name="step-2" label="Dados Pessoais" />
            <ProgressStep name="step-3" label="Dados de Entrega" />
            <ProgressStep name="step-4" label="Pedido Finalizado" />
          </ProgressIndicator>
        </div>
      </div>
      <Card style={cardStyle}>
        <div id="step-form-9" noValidate>
          <RenderIf isTrue={stepIndex === 0}>
            <ProductCartList company={props.match.params.company} width={800} />
          </RenderIf>
          <RenderIf isTrue={stepIndex === 1}>
            <ClientForm />
          </RenderIf>
          <RenderIf isTrue={stepIndex === 2}>
            <DeliveryFormData company={props.match.params.company} />
          </RenderIf>
          <RenderIf isTrue={stepIndex === 3}>
            <OrderSummary />
          </RenderIf>
        </div>
      </Card>

      <div className="rainbow-m-top_xx-large rainbow-align-content_center rainbow-flex_wrap">
        <Button
          label="Voltar"
          onClick={handleBackClick}
          variant="neutral"
          disabled={isBackDisabled()}
          className="rainbow-m-horizontal_medium"
        />
        <RenderIf isTrue={isLastStep()}>
          <Button
            label="Finalizar"
            variant="brand"
            className="rainbow-m-horizontal_medium"
            onClick={() => submitOrder()}
          />
        </RenderIf>
        <RenderIf isTrue={!isLastStep()}>
          <Button
            disabled={nextStepDisabled}
            label="Prosseguir"
            onClick={handleNextClick}
            variant="brand"
            className="rainbow-m-horizontal_medium"
          />
        </RenderIf>
      </div>
    </>
  );
}
