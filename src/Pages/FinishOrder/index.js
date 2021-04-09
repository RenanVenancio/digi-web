import React, { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Avatar, Card, ProgressIndicator, ProgressStep, RenderIf } from "react-rainbow-components";
import { Redirect } from "react-router";

import ClientForm from "../../Components/ClientForm";
import DeliveryFormData from "../../Components/DeliveryFormData";
import OrderSummary from "../../Components/OrderSummary";
import ProductCartList from "../../Components/ProductCartList";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api } from "../../Services/Api";
import Toast from "../../Utils/Toast";
import { Row } from "./styles";

export default function FinishOrder(props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [deliveryValue, setDeliveryValue] = useState(0.0);
  const [redirectTo, setRedirectTo] = useState("");
  const {
    setCompany,
    clientCheckoutData,
    checkoutProducts,
    removeAllProductInCheckout,
    setClientCheckoutDataStorage,
  } = useContext(ApplicationContext);

  const stepNames = [
    "Seus Itens",
    "Dados Pessoais",
    "Dados de Entrega",
    "Revisão do pedido",
  ];

  useEffect(() => {
    setCompany(props.match.params.company);
  }, [props, setCompany]);

  const submitOrder = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    await Api.post(
      `${props.match.params.company}/order/`,
      {
        observation: "",
        client: {
          id: clientCheckoutData.id,
          name: clientCheckoutData.name,
          email: clientCheckoutData.email,
          phone: clientCheckoutData.phone,
        },
        address: {
          street: clientCheckoutData.address.street,
          neighborhood: clientCheckoutData.address.neighborhood,
          complement: clientCheckoutData.address.complement,
          zipcode: clientCheckoutData.address.zipcode,
          city: clientCheckoutData.address.city,
          state: clientCheckoutData.address.state,
          deliveryArea: clientCheckoutData.address.deliveryArea,
        },
        itens: checkoutProducts.products.map((p) => {
          return {
            product: p.id,
            quantity: p.quantity,
            observation: p.observation,
          };
        }),
        discount: "0.00",
        freightCost: "0.00",
        delivery: true,
        paymentMethod: clientCheckoutData.address.paymentMethod,
        changeValue: clientCheckoutData.address.change,
      },
      options
    ).then((result) => {
      setRedirectTo(`/${props.match.params.company}/finished`)
      removeAllProductInCheckout();
      setClientCheckoutDataStorage(result.data.client);
      setFreightCost(0.0);
      Toast.fire({
        icon: "success",
        title: "Pedido realizado com sucesso!",
      }).then((e) => {});
    });
  };

  const cardStyle = {
    height: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const setFreightCost = (value) => {
    setDeliveryValue(value);
  };

  const handleNextClick = () => {
    if (stepIndex < stepNames.length - 1) {
      const nextStepIndex = stepIndex + 1;
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
      {redirectTo !== "" ? (
        <Redirect to={{ pathname: redirectTo }} />
      ) : null}
      <Row margin={20}>
        <ProgressIndicator
          currentStepName={stepNames[stepIndex]}
          variant="numeric"
        >
          <ProgressStep name="Seus Itens" label="Seus Itens" />
          <ProgressStep name="Dados Pessoais" label="Dados Pessoais" />
          <ProgressStep name="Dados de Entrega" label="Dados de Entrega" />
          <ProgressStep name="Revisão do pedido" label="Revisão do pedido" />
        </ProgressIndicator>
      </Row>

      <Card
        style={cardStyle}
        icon={<Avatar icon={<FaEdit />} />}
        title={stepNames[stepIndex]}
      >
        <div noValidate>
          <RenderIf isTrue={stepIndex === 0}>
            <ProductCartList
              company={props.match.params.company}
              width={800}
              freightCost={0.0}
              handleNextClick={handleNextClick}
              handleBackClick={handleBackClick}
              showFooterButtons={true}
            />
          </RenderIf>
          <RenderIf isTrue={stepIndex === 1}>
            <ClientForm
              handleNextClick={handleNextClick}
              handleBackClick={handleBackClick}
              showFooterButtons={true}
              card={true}
            />
          </RenderIf>
          <RenderIf isTrue={stepIndex === 2}>
            <DeliveryFormData
              company={props.match.params.company}
              handleNextClick={handleNextClick}
              handleBackClick={handleBackClick}
              showFooterButtons={true}
              setFreightCost={setFreightCost}
            />
          </RenderIf>
          <RenderIf isTrue={stepIndex === 3}>
            <OrderSummary
              submitOrder={submitOrder}
              freightCost={deliveryValue}
            />
          </RenderIf>
        </div>
      </Card>
    </>
  );
}
