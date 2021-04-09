import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { FaPersonBooth, FaSave, FaTrash } from "react-icons/fa";
import { Avatar, Button, Card, Input, RenderIf, Select, Spinner } from "react-rainbow-components";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";

import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api } from "../../Services/Api";
import { States } from "../../Utils/States";
import Toast from "../../Utils/Toast";
import AddressList from "../AddressList";
import { Row } from "./styles";

function UserForm() {
  const [redirect, setRedirect] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { company, authenticatedUser } = useContext(ApplicationContext);

  useEffect(async () => {
    loadData();
    setIsLoading(false);
  }, [authenticatedUser]);

  useEffect(() => {}, []);

  const validationSchema = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string().min(2, "Tamanho inválido"),
    email: Yup.string()
      .email()
      .email("Email inválido")
      .required("Campo obrigatório"),
    password: Yup.string()
      .min(8, "Tamanho inválido")
      .required("Campo obrigatório"),
    phone: Yup.string()
      .min(2, "Tamanho inválido")
      .required("Campo obrigatório"),
    street: Yup.string()
      .min(2, "Tamanho inválido")
      .required("Campo obrigatório"),
    neighborhood: Yup.string()
      .min(2, "Tamanho inválido")
      .required("Campo obrigatório"),
    complement: Yup.string(),
    zipcode: Yup.string()
      .min(2, "Tamanho inválido")
      .required("Campo obrigatório"),
    city: Yup.string().min(2, "Tamanho inválido").required("Campo obrigatório"),
    state: Yup.string()
      .min(2, "Tamanho inválido")
      .required("Campo obrigatório"),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      email: "",
      password: "",
      phone: "",
      street: "",
      neighborhood: "",
      complement: "",
      zipcode: "",
      city: "",
      state: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await submitData(values);
    },
  });

  const loadData = () => {
    let data = authenticatedUser;
    formik.values.id = data.id;
    formik.values.name = data.name;
    formik.values.email = data.email;
    formik.values.password = data.password;
    formik.values.phone = data.phone;
  };

  const submitData = async (values) => {
    if (
      authenticatedUser !== null ||
      typeof authenticatedUser !== "undefined"
    ) {
      await updateData(values);
    } else {
      await saveData(values);
    }
  };

  const saveData = async (values) => {
    await Api.post(`/clients/`, {
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
      address: {
        street: values.street,
        neighborhood: values.neighborhood,
        complement: values.complement,
        zipcode: values.zipcode,
        city: values.city,
        state: values.state,
      },
    })
      .then((response) => {
        setRedirect(`/${company}/`);
        Toast.fire({
          icon: "success",
          title: "Cadastro efetuado com sucesso!",
        }).then((e) => {});
      })
      .catch((error) => {
        Toast.fire({
          icon: "success",
          title: error.response.data.msg,
        }).then((e) => {});
      });
  };

  const updateData = async (values) => {
    await Api.put(`/clients/${authenticatedUser.id}`, {
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
      address: {
        street: values.street,
        neighborhood: values.neighborhood,
        complement: values.complement,
        zipcode: values.zipcode,
        city: values.city,
        state: values.state,
      },
    }).then((response) => {
      Toast.fire({
        icon: "success",
        title: "Dados Atualizados com sucesso, realize o login!",
      }).then((e) => {});
    });
  };

  const handleDelete = () => {};

  const inputStyles = {
    flex: 1,
  };

  const cardStyle = {
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const inputLabelAlign = "left";

  return (
    <>
      <Spinner variant="brand" isVisible={isLoading} />
      {redirect !== "" ? <Redirect push to={redirect} /> : null}
      <Card
        style={cardStyle}
        icon={<Avatar icon={<FaPersonBooth />} />}
        title="Dados do Cliente"
        children={
          <>
            <form onSubmit={formik.handleSubmit}>
              <Row>
                <Input
                  id="name"
                  labelAlignment={inputLabelAlign}
                  name="name"
                  label="Nome"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={inputStyles}
                  placeholder="Digite o seu nome"
                  type="text"
                  className="rainbow-p-around_medium"
                  error={formik.errors.name ? formik.errors.name : ""}
                />
                <Input
                  id="email"
                  labelAlignment={inputLabelAlign}
                  name="email"
                  label="E-mail"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={inputStyles}
                  placeholder="email@email.com"
                  type="text"
                  className="rainbow-p-around_medium"
                  error={formik.errors.email ? formik.errors.email : ""}
                />
              </Row>
              <Row>
                <Input
                  id="phone"
                  labelAlignment={inputLabelAlign}
                  name="phone"
                  label="Telefone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={inputStyles}
                  placeholder="(XX)XXXXXXXX"
                  type="text"
                  className="rainbow-p-around_medium"
                  error={formik.errors.phone ? formik.errors.phone : ""}
                />
              </Row>
              <RenderIf
                isTrue={
                  authenticatedUser === null ||
                  typeof authenticatedUser == "undefined"
                }
              >
                <Row>
                  <Input
                    id="password"
                    labelAlignment={inputLabelAlign}
                    name="password"
                    label="Senha"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={inputStyles}
                    placeholder="Mais de 8 caracteres"
                    type="password"
                    className="rainbow-p-around_medium"
                    error={formik.errors.password ? formik.errors.password : ""}
                  />
                </Row>
                <Row>
                  <Input
                    id="zipcode"
                    labelAlignment={inputLabelAlign}
                    name="zipcode"
                    label="CEP"
                    value={formik.values.zipcode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={inputStyles}
                    placeholder="Apenas Números"
                    type="number"
                    className="rainbow-p-around_medium"
                    error={formik.errors.zipcode ? formik.errors.zipcode : ""}
                  />
                  <Input
                    id="city"
                    labelAlignment={inputLabelAlign}
                    name="city"
                    label="Cidade"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={inputStyles}
                    placeholder="João Pessoa"
                    type="text"
                    className="rainbow-p-around_medium"
                    error={formik.errors.city ? formik.errors.city : ""}
                  />
                  <Select
                    id="state"
                    labelAlignment={inputLabelAlign}
                    name="state"
                    label="Estado"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={inputStyles}
                    placeholder="PB"
                    options={States.UF}
                    type="text"
                    className="rainbow-p-around_medium"
                    error={formik.errors.state ? formik.errors.state : ""}
                  />
                </Row>
                <Row>
                  <Input
                    id="street"
                    labelAlignment={inputLabelAlign}
                    name="street"
                    label="Endereço"
                    value={formik.values.street}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={inputStyles}
                    placeholder="Rua João Pessoa 234 Sala A"
                    type="text"
                    className="rainbow-p-around_medium"
                    error={formik.errors.street ? formik.errors.street : ""}
                  />
                  <Input
                    id="neighborhood"
                    labelAlignment={inputLabelAlign}
                    name="neighborhood"
                    label="Bairro"
                    value={formik.values.neighborhood}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={inputStyles}
                    placeholder="Centro"
                    type="text"
                    className="rainbow-p-around_medium"
                    error={
                      formik.errors.neighborhood
                        ? formik.errors.neighborhood
                        : ""
                    }
                  />
                </Row>
                <Row>
                  <Input
                    id="complement"
                    labelAlignment={inputLabelAlign}
                    name="complement"
                    label="Complemento"
                    value={formik.values.complement}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={inputStyles}
                    placeholder="Proximo ao prédio azul"
                    type="text"
                    className="rainbow-p-around_medium"
                    error={
                      formik.errors.complement ? formik.errors.complement : ""
                    }
                  />
                </Row>
              </RenderIf>

              <AddressList />

              <Button
                className="rainbow-m-around_medium"
                variant="destructive"
                type="button"
                className="rainbow-m-around_medium"
                onClick={() => handleDelete()}
                disabled={
                  formik.values.id === null ||
                  typeof formik.values.id === "undefined"
                }
              >
                Deletar <FaTrash className="rainbow-m-left_medium" />
              </Button>
              <Button
                className="rainbow-m-around_medium"
                variant="border-filled"
                type="submit"
                className="rainbow-m-around_medium"
              >
                Enviar <FaSave className="rainbow-m-left_medium" />
              </Button>
            </form>
          </>
        }
      />
    </>
  );
}

export default UserForm;
