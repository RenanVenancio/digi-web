import React, { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Api } from "../../Services/Api";
import {
  Card,
  Avatar,
  Button,
  FileSelector,
  Select,
  Input,
} from "react-rainbow-components";
import { FaStore, FaSave } from "react-icons/fa";
import { States } from "../../Utils/States";
import { Row } from "./styles";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
import Toast from "../../Utils/Toast";
import FileUpload from "../FileUpload";

function CompanyForm() {
  const [companyData, setCompanyData] = useState({});
  const [companyLogo, setCompanyLogo] = useState();
  const { company } = useContext(ApplicationContext);
  const validationSchema = Yup.object().shape({
    domain: Yup.string()
      .min(2, "Tamanho inválido")
      .required("Campo obrigatório"),
    cpfCnpj: Yup.string()
      .min(2, "Tamanho inválido")
      .required("Campo obrigatório"),
    name: Yup.string().min(2, "Tamanho inválido").required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    street: Yup.string().required("Campo obrigatório"),
    neighborhood: Yup.string().required("Campo obrigatório"),
    complement: Yup.string(),
    zipcode: Yup.string().required("Campo obrigatório"),
    city: Yup.string().required("Campo obrigatório"),
    state: Yup.string().required("Campo obrigatório"),
  });

  useEffect(() => {
    Api.get(`${company}/companies`).then((response) => {
      let data = response.data;
      formik.values.domain = data.domain;
      formik.values.cpfCnpj = data.cpfCnpj;
      formik.values.name = data.name;
      formik.values.email = data.email;
      formik.values.street = data.address.street;
      formik.values.neighborhood = data.address.neighborhood;
      formik.values.complement = data.address.complement;
      formik.values.zipcode = data.address.zipcode;
      formik.values.city = data.address.city;
      formik.values.state = data.address.state;
      formik.values.logo = data.logo;
      setCompanyData(response.data);
      setCompanyLogo(response.data.logo);
    });
  }, [company]);

  const formik = useFormik({
    initialValues: {
      domain: "",
      cpfCnpj: "",
      name: "",
      email: "",
      street: "",
      neighborhood: "",
      complement: "",
      zipcode: "",
      city: "",
      state: "",
      deliveryArea: "",
      logo: "",
      phones: [],
    },
    validationSchema,
    onSubmit: (values) => {
      submitData(values);
    },
  });

  const submitData = async (values) => {
    Api.put(`/${company}/companies/`, {
      domain: values.domain,
      cpfCnpj: values.cpfCnpj,
      name: values.name,
      phones: values.phones,
      email: values.email,
      logo: companyLogo,
      address: {
        street: values.street,
        neighborhood: values.neighborhood,
        complement: values.complement,
        zipcode: values.zipcode,
        city: values.city,
        state: values.state,
      },
    })
      .then((result) => {
        Toast.fire({
          icon: "success",
          title: "Seus dados foram salvos com sucesso!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setAttachmentId = (id) => {
    setCompanyLogo(id);
  };

  const inputStyles = {
    flex: 1,
  };

  const cardStyle = {
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  };

  return (
    <>
      <Card
        style={cardStyle}
        icon={<Avatar icon={<FaStore />} />}
        title="Dados da Empresa"
        children={
          <>
            <Row center>
              <FileUpload
                attachmentId={companyLogo}
                setAttachmentId={setAttachmentId}
              />
            </Row>
            <form onSubmit={formik.handleSubmit}>
              <Row>
                <Input
                  id="domain"
                  name="domain"
                  label="Domínio"
                  value={formik.values.domain}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={inputStyles}
                  placeholder="dominio.com"
                  type="text"
                  className="rainbow-p-around_medium"
                  error={formik.errors.domain ? formik.errors.domain : ""}
                />
                <Input
                  id="cpfCnpj"
                  name="cpfCnpj"
                  label="CPF | CNPJ"
                  value={formik.values.cpfCnpj}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={inputStyles}
                  placeholder="1234569871233"
                  type="text"
                  className="rainbow-p-around_medium"
                  error={formik.errors.cpfCnpj ? formik.errors.cpfCnpj : ""}
                />
              </Row>
              <Row>
                <Input
                  id="name"
                  name="name"
                  label="Nome"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={inputStyles}
                  placeholder="Nome da sua loja"
                  type="text"
                  className="rainbow-p-around_medium"
                  error={formik.errors.name ? formik.errors.name : ""}
                />
                <Input
                  id="email"
                  name="email"
                  label="E-mail"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={inputStyles}
                  placeholder="seuemail@email.com"
                  type="email"
                  className="rainbow-p-around_medium"
                  error={formik.errors.email ? formik.errors.email : ""}
                />
              </Row>
              <Row>
                <Input
                  id="zipcode"
                  name="zipcode"
                  label="CEP"
                  value={formik.values.zipcode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={inputStyles}
                  placeholder="00000000"
                  type="text"
                  className="rainbow-p-around_medium"
                  error={formik.errors.zipcode ? formik.errors.zipcode : ""}
                />
                <Input
                  id="city"
                  name="city"
                  label="Cidade"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={inputStyles}
                  placeholder="Sapé"
                  type="text"
                  className="rainbow-p-around_medium"
                  error={formik.errors.city ? formik.errors.city : ""}
                />
                <Select
                  id="state"
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
                  name="street"
                  label="Nome da Rua"
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={inputStyles}
                  placeholder="Rua Marilda cunha 223A"
                  type="text"
                  className="rainbow-p-around_medium"
                  error={formik.errors.street ? formik.errors.street : ""}
                />
                <Input
                  id="neighborhood"
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
                    formik.errors.neighborhood ? formik.errors.neighborhood : ""
                  }
                />
              </Row>
              <Input
                id="complement"
                name="complement"
                label="Complemento"
                value={formik.values.complement}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Complemento do endereço"
                type="text"
                className="rainbow-p-around_medium"
                error={formik.errors.complement ? formik.errors.complement : ""}
              />
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

export default CompanyForm;
