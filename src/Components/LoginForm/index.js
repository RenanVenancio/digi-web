import React, { useContext } from "react";
import { useFormik } from "formik";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Input, Button } from "react-rainbow-components";
import { FaArrowRight } from "react-icons/fa";
import * as Yup from "yup";
import { Col, Row } from "./styles";

function LoginForm() {
  const { login } = useContext(ApplicationContext);
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

  const inputStyles = (value) => {
    return { width: value + "%" };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(values.email, values.password);
  };

  return (
    <Col center>
      <Row center>
        <form onSubmit={handleSubmit} style={{ width: "400px" }}>
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
            type="submit"
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
