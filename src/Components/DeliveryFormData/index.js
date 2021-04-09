import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { FaMotorcycle } from "react-icons/fa";
import { Button, Input, RadioButtonGroup, RenderIf, Select } from "react-rainbow-components";
import * as Yup from "yup";

import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api } from "../../Services/Api";
import CompanyLocation from "../CompanyLocation";
import OrderSubTotal from "../OrderSubTotal";
import { Col, Row } from "./styles";

const DeliveryFormData = ({
  company,
  readOnly,
  handleNextClick,
  handleBackClick,
  showFooterButtons,
  setFreightCost,
}) => {
  const { clientCheckoutData, setClientCheckoutData } = useContext(
    ApplicationContext
  );
  const [deliveryAreas, setDeliveryAreas] = useState([]);
  const [deliveryoptions, setDeliveryoptions] = useState([]);
  const [readOnlyFields, setReadOnlyFields] = useState(false);
  const validationSchema = Yup.object().shape({
    delivery: Yup.string(),
    deliveryArea: Yup.string().required("Campo obirgatório"),
    zipcode: Yup.string().required("Campo obirgatório"),
    street: Yup.string().required("Campo obirgatório"),
    neighborhood: Yup.string().required("Campo obirgatório"),
    complement: Yup.string("Campo obirgatório"),
    change: Yup.number().test(
      "verify-change",
      "O valor do troco está incorreto",
      function (value) {
        return value < 0 ? false : true;
      }
    ),
  });

  const formik = useFormik({
    initialValues: {
      delivery:
        clientCheckoutData !== undefined && clientCheckoutData.delivery
          ? clientCheckoutData.address.delivery
          : "1",
      deliveryArea:
        typeof clientCheckoutData.address !== "undefined" &&
        clientCheckoutData.deliveryArea
          ? clientCheckoutData.address.deliveryArea
          : "",
      deliveryValue:
        typeof clientCheckoutData.address !== "undefined" &&
        typeof clientCheckoutData.address.deliveryValue !== "undefined"
          ? clientCheckoutData.address.deliveryValue
          : "0",
      zipcode:
        typeof clientCheckoutData.address !== "undefined" &&
        clientCheckoutData.address &&
        clientCheckoutData.address.zipcode !== null
          ? clientCheckoutData.address.zipcode
          : "",
      street:
        typeof clientCheckoutData.address !== "undefined" &&
        clientCheckoutData.address
          ? clientCheckoutData.address.street
          : "",
      neighborhood:
        clientCheckoutData !== undefined && clientCheckoutData.address
          ? clientCheckoutData.address.neighborhood
          : "",
      complement:
        clientCheckoutData !== undefined && clientCheckoutData.address
          ? clientCheckoutData.address.complement
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
    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: false,
    isInitialValid: false,
  });

  useEffect(async () => {
    await loadDeliveryAreas();
  }, [company]);

  useEffect(() => {
    setClientCheckoutData({
      ...clientCheckoutData,
      clientDataIsValid: formik.isValid,
    });
  }, [formik.isValid]);

  useEffect(() => {
    formik.setFieldValue(
      "deliveryValue",
      getDeliveryValueById(formik.values.deliveryArea)
    );
  }, [formik.values.deliveryArea]);

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
      if (
        typeof formik.values.deliveryValue !== "undefined" &&
        formik.values.deliveryValue != 0
      ) {
        formik.setFieldValue(
          "deliveryArea",
          clientCheckoutData.address.deliveryArea
        );
      }
    });
  }

  const loadDeliveryAreaById = (deliveryAreaId) => {
    let area = deliveryAreas.filter((i) => i.id === deliveryAreaId);
    return area.length > 0 ? area[0].city + "-" + area[0].state : null;
  };

  const getDeliveryValueById = (id) => {
    let value = deliveryAreas.filter((item) => item.id == id);
    if (value.length === 0) {
      return 0.0;
    }
    return value[0].deliveryValue;
  };

  const getDeliveryAreaById = (id) => {
    let value = deliveryAreas.filter((item) => item.id == id);
    if (value.length === 0) {
      return null;
    }
    return value[0].deliveryValue;
  };

  const saveInContext = () => {
    let oldState = clientCheckoutData;
    if (typeof oldState.address === "undefined") {
      oldState["address"] = {};
    }
    oldState.address.complement =
      typeof formik.values.complement !== "undefined"
        ? formik.values.complement
        : "";
    oldState.address.deliveryArea =
      typeof formik.values.deliveryArea !== "undefined"
        ? formik.values.deliveryArea
        : "";
    oldState.address.id = formik.values.id;
    oldState.address.neighborhood = formik.values.neighborhood;
    oldState.address.state = formik.values.state;
    oldState.address.street = formik.values.street;
    oldState.address.zipcode = formik.values.zipcode;
    oldState.address.delivery = formik.values.delivery;
    oldState.address.deliveryArea = formik.values.deliveryArea;
    oldState.address.deliveryValue =
      typeof formik.values.deliveryValue !== "undefined"
        ? formik.values.deliveryValue
        : "0.00";
    oldState.address.paymentMethod = formik.values.paymentMethod;
    handleNextClick();
    setClientCheckoutData(oldState);
    setFreightCost(getDeliveryValueById(formik.values.deliveryArea))
  };

  const deliveryMethods = [
    { value: "1", label: "Delivery" },
    { value: "2", label: "Retirar" },
  ];

  const paymentMethods = [
    { value: "0", label: "Dinheiro" },
    { value: "1", label: "Cartão" },
  ];

  const inputStyles = {
    flex: 1,
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Col>
          <Row center>
            <RadioButtonGroup
              labelAlignment="left"
              label="Modalidade de entrega"
              name="delivery"
              className="rainbow-m-top_large rainbow-m-bottom_medium"
              options={deliveryMethods}
              value={formik.values.delivery}
              variant="brand"
              onChange={formik.handleChange}
              error={formik.errors.delivery ? formik.errors.delivery : ""}
            />
          </Row>
          <RenderIf isTrue={formik.values.delivery === "1"}>
            <Row>
              <RenderIf isTrue={!readOnlyFields}>
                <Select
                  style={inputStyles}
                  labelAlignment="left"
                  name="deliveryArea"
                  label="Selecione sua cidade"
                  hideLabel={false}
                  required
                  onChange={formik.handleChange}
                  value={formik.values.deliveryArea}
                  options={deliveryoptions}
                  className="rainbow-p-around_medium"
                  error={
                    formik.errors.deliveryArea ? formik.errors.deliveryArea : ""
                  }
                />
              </RenderIf>
              <RenderIf isTrue={readOnlyFields}>
                <Input
                  style={inputStyles}
                  labelAlignment="left"
                  label="Cidade"
                  hideLabel={false}
                  readOnly
                  onChange={formik.handleChange}
                  value={loadDeliveryAreaById(formik.values.deliveryArea)}
                  className="rainbow-p-around_medium"
                  error={
                    formik.errors.deliveryArea ? formik.errors.deliveryArea : ""
                  }
                />
              </RenderIf>
              <Input
                name="deliveryValue"
                style={inputStyles}
                labelAlignment="left"
                value={formik.values.deliveryValue.toLocaleString("pt-br", {
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
                otherCosts={formik.values.deliveryValue}
                variation="input"
              />
            </Row>
            <Row>
              <Input
                readOnly={readOnlyFields}
                name="zipcode"
                style={inputStyles}
                labelAlignment="left"
                required
                value={formik.values.zipcode}
                onChange={formik.handleChange}
                label="CEP"
                placeholder="00000000"
                type="number"
                className="rainbow-p-around_medium"
                error={formik.errors.zipcode ? formik.errors.zipcode : ""}
              />
              <Input
                readOnly={readOnlyFields}
                name="street"
                style={inputStyles}
                labelAlignment="left"
                required
                value={formik.values.street}
                onChange={formik.handleChange}
                label="Nome da Rua"
                placeholder="Ex: Av pres Getúlio vargas, 394A"
                type="text"
                className="rainbow-p-around_medium"
                error={formik.errors.street ? formik.errors.street : ""}
              />
              <Input
                readOnly={readOnlyFields}
                name="neighborhood"
                style={inputStyles}
                labelAlignment="left"
                required
                onChange={formik.handleChange}
                label="Bairro"
                value={formik.values.neighborhood}
                placeholder="Centro"
                type="text"
                className="rainbow-p-around_medium"
                error={
                  formik.errors.neighborhood ? formik.errors.neighborhood : ""
                }
              />
            </Row>
            <Row>
              <Input
                readOnly={readOnlyFields}
                name="complement"
                style={inputStyles}
                labelAlignment="left"
                label="Complemento"
                value={formik.values.complement}
                onChange={formik.handleChange}
                placeholder="Ao lado do prédio azul"
                type="text"
                className="rainbow-p-around_medium"
              />
            </Row>
            <Row>
              <Select
                style={inputStyles}
                labelAlignment="left"
                name="paymentMethod"
                label="Forma de Pagamento"
                hideLabel={false}
                required
                onChange={formik.handleChange}
                value={formik.values.paymentMethod}
                options={paymentMethods}
                className="rainbow-p-around_medium"
              />
              <RenderIf isTrue={formik.values.paymentMethod === "0"}>
                <Input
                  readOnly={readOnlyFields}
                  name="change"
                  style={inputStyles}
                  labelAlignment="left"
                  required
                  value={formik.values.change}
                  onChange={formik.handleChange}
                  label="Troco"
                  placeholder="0.00"
                  type="number"
                  min={0}
                  className="rainbow-p-around_medium"
                  error={formik.errors.change ? formik.errors.change : ""}
                />
              </RenderIf>
            </Row>
          </RenderIf>
          <RenderIf isTrue={formik.values.delivery === "2"}>
            <CompanyLocation />
          </RenderIf>
        </Col>
      </form>
      <RenderIf isTrue={showFooterButtons}>
        <div className="rainbow-m-top_xx-large rainbow-m-bottom_xx-large rainbow-align-content_center rainbow-flex_wrap">
          <Button
            label="Voltar"
            onClick={handleBackClick}
            variant="neutral"
            className="rainbow-m-horizontal_medium"
          />
          <Button
            label="Prosseguir"
            onClick={saveInContext}
            variant="brand"
            className="rainbow-m-horizontal_medium"
          />
        </div>
      </RenderIf>
    </>
  );
};

export default DeliveryFormData;
