import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "react-rainbow-components";
import { ApplicationContext } from "../../Contexts/ApplicationContext";

const ClientForm = () => {
  const { setClientCheckoutData, clientCheckoutData } = useContext(ApplicationContext);

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Tamanho inválido"),
    email: Yup.string().email().email("Email inválido").required(),
    phone: Yup.string().min(2, "Tamanho inválido").required(),
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    validateForm,
    isValid,
    values,
    errors,
  } = useFormik({
    initialValues: {
      name: clientCheckoutData.clientData !== undefined && clientCheckoutData.clientData.name ? clientCheckoutData.clientData.name : "",
      phone: clientCheckoutData.clientData !== undefined && clientCheckoutData.clientData.phone ? clientCheckoutData.clientData.phone : "",
      email: clientCheckoutData.clientData !== undefined && clientCheckoutData.clientData.email ? clientCheckoutData.clientData.email : "",
    },
    validationSchema,
  });

  useEffect(() => {
    setClientCheckoutData({ clientData: values, clientDataIsValid: false });
    validateForm();
  }, [setClientCheckoutData]);

  useEffect(() => {
    setClientCheckoutData({ clientData: values, clientDataIsValid: isValid });
  }, [values]);

  useEffect(() => {
    setClientCheckoutData({ clientData: values, clientDataIsValid: isValid });
  }, [isValid]);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="name"
        name="name"
        label="Seu nome"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Digite aqui..."
        type="text"
        className="rainbow-p-around_medium"
        error={errors.name ? errors.name : ""}
      />
      <Input
        name="phone"
        label="Telefone"
        value={values.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="(XX)XXXXXX-XXXX"
        type="text"
        className="rainbow-p-around_medium"
      />
      <Input
        name="email"
        label="E-mail"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="email@email.com"
        type="text"
        className="rainbow-p-around_medium"
      />
    </form>
  );
};

export default ClientForm;
