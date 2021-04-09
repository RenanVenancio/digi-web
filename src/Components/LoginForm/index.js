import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Button, Input } from "react-rainbow-components";
import { Redirect } from "react-router";
import * as Yup from "yup";

import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Col, Row } from "./styles";

function LoginForm({ onRequestLogin, redirectTo }) {
  const { login, company } = useContext(ApplicationContext);
  const [redirect, setRedirect] = useState("");
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .email("Email inválido")
      .required("Informe o e-mail"),
    password: Yup.string().min(2, "Tamanho inválido").required(),
  });

  const { handleChange, handleBlur, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
  });

  const handleLogin = async () => {
    await login(values.email, values.password).then(() => {
      if (onRequestLogin !== null && typeof onRequestLogin !== "undefined") {
        onRequestLogin();
      }
      if (typeof redirectTo !== "undefined" && redirectTo !== "") {
        setRedirect(redirectTo);
      }
    });
  };

  const inputStyles = (value) => {
    return { width: value + "%" };
  };

  return (
    <Col center>
      {typeof redirect !== "undefined" && redirect !== "" ? (
        <Redirect to={{ pathname: `/${company}/${redirectTo}` }} />
      ) : (
        ""
      )}
      <Row center>
        <form onSubmit={handleLogin} style={{ width: "400px" }}>
          <Input
            name="email"
            label="E-mail"
            style={inputStyles(100)}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="email@email.com"
            type="email"
            className="rainbow-p-around_medium"
            error={errors.email ? errors.email : ""}
          />
          <Input
            name="password"
            style={inputStyles(100)}
            label="Senha"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="senha"
            type="password"
            className="rainbow-p-around_medium"
            error={errors.password ? errors.password : ""}
          />
          <Button
            variant="neutral"
            className="rainbow-m-around_medium"
            onClick={handleLogin}
          >
            Entrar
            <FaArrowRight />
          </Button>
        </form>
      </Row>
    </Col>
  );
}

export default LoginForm;
