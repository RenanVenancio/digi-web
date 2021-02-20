import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  RadioButtonGroup,
  RenderIf,
} from "react-rainbow-components";
import { FaMotorcycle } from "react-icons/fa";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api } from "../../Services/Api";
import { Col, Row } from "./styles";
import CompanyLocation from "../CompanyLocation";
import OrderSubTotal from "../OrderSubTotal";

const DeliveryFormData = ({ company, readOnly }) => {
  const { clientCheckoutData, setClientCheckoutData } = useContext(
    ApplicationContext
  );
  const [deliveryAreas, setDeliveryAreas] = useState([]);
  const [deliveryoptions, setDeliveryoptions] = useState([]);
  const [readOnlyFields, setReadOnlyFields] = useState(false);
  const validationSchema = Yup.object().shape({
    delivery: Yup.string(),
    deliveryArea: Yup.string().required(),
    street: Yup.string().required(),
    neighborhood: Yup.string().required(),
    complement: Yup.string(),
    change: Yup.number().test(
      "verify-change",
      "O valor do troco está incorreto",
      function (value) {
        return value < 0 ? false : true;
      }
    ),
  });

  const {
    handleSubmit,
    handleChange,
    isValid,
    values,
    errors,
  } = useFormik({
    initialValues: {
      delivery:
        clientCheckoutData.deliveryData !== undefined &&
        clientCheckoutData.deliveryData.delivery
          ? clientCheckoutData.deliveryData.delivery
          : "1",
      deliveryArea:
        clientCheckoutData.deliveryData !== undefined &&
        clientCheckoutData.deliveryData.deliveryArea
          ? clientCheckoutData.deliveryData.deliveryArea
          : "",
      deliveryValue:
        clientCheckoutData.deliveryData !== undefined &&
        clientCheckoutData.deliveryData.deliveryValue
          ? clientCheckoutData.deliveryData.deliveryValue
          : 0,
      street:
        clientCheckoutData.deliveryData !== undefined &&
        clientCheckoutData.deliveryData.street
          ? clientCheckoutData.deliveryData.street
          : "",
      neighborhood:
        clientCheckoutData.deliveryData !== undefined &&
        clientCheckoutData.deliveryData.neighborhood
          ? clientCheckoutData.deliveryData.neighborhood
          : "",
      complement:
        clientCheckoutData.deliveryData !== undefined &&
        clientCheckoutData.deliveryData.complement
          ? clientCheckoutData.deliveryData.complement
          : "",
      paymentMethod:
        clientCheckoutData.deliveryData !== undefined &&
        clientCheckoutData.deliveryData.paymentMethod
          ? clientCheckoutData.deliveryData.paymentMethod
          : "1",
      change:
        clientCheckoutData.deliveryData !== undefined &&
        clientCheckoutData.deliveryData.change
          ? clientCheckoutData.deliveryData.change
          : "0",
    },
    validationSchema,
  });

  useEffect(() => {
    loadDeliveryAreas();
  }, [company]);

  useEffect(() => {
    //setClientCheckoutData({...clientCheckoutData.clientData, deliveryData: values, deliveryDataIsValid: false });
    //validateForm();
  }, []);

  useEffect(() => {
    if (readOnly) {
      setReadOnlyFields(true);
    } else {
      setReadOnlyFields(false);
    }
  }, [readOnly]);

  useEffect(() => {
    updateDataInGlobalState();
    console.log(clientCheckoutData);
  }, [values]);

  useEffect(() => {
    updateDataInGlobalState();
  }, [isValid]);

  useEffect(() => {
    updateDeliveryValue();
  }, [values.deliveryArea]);

  async function loadDeliveryAreas() {
    await Api.get(`${company}/deliveryArea/`).then((result) => {
      setDeliveryAreas(result.data);
      let options = [{ value: 0, label: "Selecione uma localidade" }];
      result.data.map((item) => {
        options.push({
          value: item.id,
          label: `${item.city}-${item.state}`,
          deliveryCost: item.deliveryCost,
        });
      });
      setDeliveryoptions(options);
    });
  }

  const updateDataInGlobalState = () => {
    let oldClientCheckoutData = clientCheckoutData;
    oldClientCheckoutData.deliveryData = values;
    setClientCheckoutData({
      clientData: oldClientCheckoutData.clientData,
      deliveryData: oldClientCheckoutData.deliveryData,
      deliveryDataIsValid: isValid,
    });
  };

  const loadDeliveryAreaById = (deliveryAreaId) => {
    let area = deliveryAreas.filter((i) => i.id === deliveryAreaId);
    return area.length > 0 ? area[0].city + "-" + area[0].state : null;
  };

  const updateDeliveryValue = () => {
    let area = deliveryAreas.filter((i) => i.id === values.deliveryArea);
    let value = area.length === 0 ? 0 : area[0].deliveryValue;
    if (values.deliveryValue !== value && value !== 0) {
      values.deliveryValue = value;
    }
  };

  const deliveryMethods = [
    { value: "1", label: "Delivery" },
    { value: "2", label: "Retirar" },
  ];

  const paymentMethods = [
    { value: "0", label: "Dinheiro" },
    { value: "1", label: "Cartão" },
  ];

  const inputStyles = (value) => {
    return { width: value + "%" };
  };

  return (
    <form onSubmit={handleSubmit}>
      <Col>
        <Row center>
          <RadioButtonGroup
            labelAlignment="left"
            label="Modalidade de entrega"
            name="delivery"
            className="rainbow-m-top_large rainbow-m-bottom_medium"
            options={deliveryMethods}
            value={values.delivery}
            variant="brand"
            onChange={handleChange}
            error={errors.delivery ? errors.delivery : ""}
          />
        </Row>
        <RenderIf isTrue={values.delivery === "1"}>
          <Row>
            <RenderIf isTrue={!readOnlyFields}>
              <Select
                style={inputStyles(40)}
                labelAlignment="left"
                name="deliveryArea"
                label="Selecione sua cidade"
                hideLabel={false}
                required
                onChange={handleChange}
                value={values.deliveryArea}
                options={deliveryoptions}
                className="rainbow-p-around_medium"
                error={errors.deliveryArea ? errors.deliveryArea : ""}
              />
            </RenderIf>
            <RenderIf isTrue={readOnlyFields}>
              <Input
                style={inputStyles(40)}
                labelAlignment="left"
                label="Cidade"
                hideLabel={false}
                readOnly
                onChange={handleChange}
                value={loadDeliveryAreaById(values.deliveryArea)}
                className="rainbow-p-around_medium"
                error={errors.deliveryArea ? errors.deliveryArea : ""}
              />
            </RenderIf>
            <Input
              name="deliveryValue"
              style={inputStyles(30)}
              labelAlignment="left"
              value={values.deliveryValue.toLocaleString("pt-br", {
                minimumFractionDigits: 2,
              })}
              label="Taxa de Entrega"
              variant="shaded"
              readOnly
              icon={<FaMotorcycle />}
              type="text"
              className="rainbow-p-around_medium"
            />
            <OrderSubTotal
              otherCosts={values.deliveryValue}
              variation="input"
            />
          </Row>
          <Row>
            <Input
              readOnly={readOnlyFields}
              name="street"
              style={inputStyles(70)}
              labelAlignment="left"
              required
              value={values.street}
              onChange={handleChange}
              label="Nome da Rua"
              placeholder="Ex: Av pres Getúlio vargas, 394A"
              type="text"
              className="rainbow-p-around_medium"
              error={errors.street ? errors.street : ""}
            />
            <Input
              readOnly={readOnlyFields}
              name="neighborhood"
              style={inputStyles(30)}
              labelAlignment="left"
              required
              onChange={handleChange}
              label="Bairro"
              value={values.neighborhood}
              placeholder="Centro"
              type="text"
              className="rainbow-p-around_medium"
              error={errors.neighborhood ? errors.neighborhood : ""}
            />
          </Row>
          <Row>
            <Input
              readOnly={readOnlyFields}
              name="complement"
              style={inputStyles(100)}
              labelAlignment="left"
              label="Complemento"
              value={values.complement}
              onChange={handleChange}
              placeholder="Ao lado do prédio azul"
              type="text"
              className="rainbow-p-around_medium"
            />
          </Row>
          <Row>
            <Select
              style={inputStyles(70)}
              labelAlignment="left"
              name="paymentMethod"
              label="Forma de Pagamento"
              hideLabel={false}
              required
              onChange={handleChange}
              value={values.paymentMethod}
              options={paymentMethods}
              className="rainbow-p-around_medium"
            />
            <RenderIf isTrue={values.paymentMethod === "0"}>
              <Input
                readOnly={readOnlyFields}
                name="change"
                style={inputStyles(30)}
                labelAlignment="left"
                required
                value={values.change}
                onChange={handleChange}
                label="Troco"
                placeholder="0.00"
                type="number"
                min={0}
                className="rainbow-p-around_medium"
                error={errors.change ? errors.change : ""}
              />
            </RenderIf>
          </Row>
        </RenderIf>
        <RenderIf isTrue={values.delivery === "2"}>
          <CompanyLocation />
        </RenderIf>
      </Col>
    </form>
  );
};

export default DeliveryFormData;
