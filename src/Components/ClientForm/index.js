import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { Avatar, Button, Card, Input, RenderIf } from "react-rainbow-components";
import * as Yup from "yup";

import { ApplicationContext } from "../../Contexts/ApplicationContext";

const ClientForm = ({
  handleNextClick,
  handleBackClick,
  showFooterButtons,
  card
}) => {
  const {
    setClientCheckoutData,
    clientCheckoutData,
    updateClientDataStorage,
  } = useContext(ApplicationContext);
  const [disableNext, setDisableNext] = useState(false);
  const [readOnlyFields, setReadOnlyFields] = useState(true);
  const [cardMessage, setCardMessage] = useState("Seus dados estão corretos?");

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Tamanho inválido").required("Campo obrigatório"),
    phone: Yup.string()
      .min(2, "Tamanho inválido")
      .required("Campo obrigatório"),
  });

  const formik = useFormik({
    initialValues: {
      name:
        clientCheckoutData !== undefined && clientCheckoutData.name
          ? clientCheckoutData.name
          : "",
      phone:
        clientCheckoutData !== undefined && clientCheckoutData.phone
          ? clientCheckoutData.phone
          : "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: false,
    isInitialValid: false,
  });

  useEffect(() => {
    if (
      typeof clientCheckoutData.name !== "undefined" &&
      typeof clientCheckoutData.phone !== "undefined"
    ) {
      setReadOnlyFields(true);
      setCardMessage("Seus dados estão corretos?");
    } else {
      setReadOnlyFields(false);
      setCardMessage("Insira seus dados");
    }
  }, []);

  const saveInContext = () => {
    let oldClientData = clientCheckoutData;
    oldClientData.name = formik.values.name;
    oldClientData.phone = formik.values.phone;
    setClientCheckoutData(oldClientData);
    handleNextClick();
  };

  var inputStyles = {
    fontWeight: "bold",
  };

  const confirmData = () => {
    setReadOnlyFields(true);
    setDisableNext(false);
  };

  const editData = () => {
    setReadOnlyFields(false);
    setDisableNext(true);
    inputStyles = {};
  };

  return (
    <>
      {card ? (
        <Card
          icon={<Avatar icon={<FaQuestion />} />}
          title={cardMessage}
          style={{
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
          }}
          children={
            <form onSubmit={formik.handleSubmit}>
              <Input
                id="name"
                name="name"
                label="Seu nome"
                readOnly={readOnlyFields}
                labelAlignment="left"
                value={formik.values.name}
                style={inputStyles}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Digite aqui..."
                type="text"
                className="rainbow-p-around_medium"
                error={formik.errors.name ? formik.errors.name : ""}
              />
              <Input
                name="phone"
                label="Telefone"
                readOnly={readOnlyFields}
                labelAlignment="left"
                value={formik.values.phone}
                style={inputStyles}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="(XX)XXXXXX-XXXX"
                type="text"
                className="rainbow-p-around_medium"
                error={formik.errors.phone ? formik.errors.phone : ""}
              />
            </form>
          }
          footer={
            <div className="rainbow-align-content_space-around">
              <div className="rainbow-flex-center">
                <RenderIf isTrue={readOnlyFields === true}>
                  <Button
                    label="Não"
                    className="rainbow-m-right_xx-small"
                    onClick={editData}
                  />
                  <Button
                    label="Sim, prosseguir"
                    variant="outline-brand"
                    className="rainbow-m-right_xx-small"
                    onClick={() => {
                      confirmData();
                      saveInContext();
                    }}
                  />
                </RenderIf>
                <RenderIf isTrue={readOnlyFields === false}>
                  <Button
                    label="Confirmar Dados"
                    variant="outline-brand"
                    disabled={!formik.isValid}
                    className="rainbow-m-right_xx-small"
                    onClick={() => {
                      confirmData();
                      saveInContext();
                    }}
                  />
                </RenderIf>
              </div>
            </div>
          }
        />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Input
            id="name"
            name="name"
            label="Seu nome"
            readOnly={readOnlyFields}
            labelAlignment="left"
            value={formik.values.name}
            style={inputStyles}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Digite aqui..."
            type="text"
            className="rainbow-p-around_medium"
            error={formik.errors.name ? formik.errors.name : ""}
          />
          <Input
            name="phone"
            label="Telefone"
            readOnly={readOnlyFields}
            labelAlignment="left"
            value={formik.values.phone}
            style={inputStyles}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="(XX)XXXXXX-XXXX"
            type="text"
            className="rainbow-p-around_medium"
            error={formik.errors.phone ? formik.errors.phone : ""}
          />
        </form>
      )}

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
            disabled={!formik.isValid || disableNext}
            onClick={saveInContext}
            variant="brand"
            className="rainbow-m-horizontal_medium"
          />
        </div>
      </RenderIf>
    </>
  );
};

ClientForm.propTypes = {
  handleNextClick: PropTypes.func,
  handleBackClick: PropTypes.func,
  showFooterButtons: PropTypes.bool,
  style: PropTypes.bool
};

ClientForm.defaultProps = {
  showFooterButtons: true,
  card: true
};

export default ClientForm;
