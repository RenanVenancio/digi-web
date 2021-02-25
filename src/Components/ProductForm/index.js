import React from "react";
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
// import { Container } from './styles';

function ProductForm({ id }) {
  const [companyData, setCompanyData] = useState({});
  const { company } = useContext(ApplicationContext);
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Tamanho inválido").required("Campo obrigatório"),
    description: Yup.string()
      .min(2, "Tamanho inválido")
      .required("Campo obrigatório"),
    costPrice: Yup().number().required().positive().double(),
    salePrice: Yup().number().required().positive().double(),
    productCategory: Yup.number().required(),
  });

  useEffect(() => {
    Api.get(`${company}/products/${id}`).then((response) => {
      let data = response.data;
      formik.values.name = data.name;
      formik.values.description = data.description;
      formik.values.costPrice = data.name;
      formik.values.salePrice = data.email;
      formik.values.productCategory = data.productCategory;
      setCompanyData(response.data);
    });
  }, [company]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      costPrice: 0.0,
      salePrice: 0.0,
      productCategory: "",
    },
    validationSchema,
    onSubmit: (values) => {
      submitData(values);
    },
  });

  const submitData = async (values) => {
    Api.put(`/${company}/products/${id}`, {
      name: values.name,
      description: values.description,
      costPrice: values.costPrice,
      salePrice: values.salePrice,
      productCategory: values.productCategory,
    }).then((result) => {
      Toast.fire({
        icon: "success",
        title: "Seus dados foram salvos com sucesso!",
      });
    });
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
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Input
                id="name"
                name="name"
                label="Nome"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={inputStyles}
                placeholder="dominio.com"
                type="text"
                className="rainbow-p-around_medium"
                error={formik.errors.name ? formik.errors.name : ""}
              />
              <Input
                id="description"
                name="description"
                label="Descrição"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={inputStyles}
                placeholder="Breve descrição do produto"
                type="text"
                className="rainbow-p-around_medium"
                error={
                  formik.errors.description ? formik.errors.description : ""
                }
              />
            </Row>
            <Row>
              <Input
                id="costPrice"
                name="costPrice"
                label="E-mail"
                value={formik.values.costPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={inputStyles}
                placeholder="0,00"
                type="number"
                className="rainbow-p-around_medium"
                error={formik.errors.costPrice ? formik.errors.costPrice : ""}
              />
              <Input
                id="salePrice"
                name="salePrice"
                label="Nome"
                value={formik.values.salePrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={inputStyles}
                placeholder="Nome da sua loja"
                type="number"
                className="rainbow-p-around_medium"
                error={formik.errors.salePrice ? formik.errors.salePrice : ""}
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
            <Button
              className="rainbow-m-around_medium"
              variant="border-filled"
              type="submit"
              className="rainbow-m-around_medium"
            >
              Enviar <FaSave className="rainbow-m-left_medium" />
            </Button>
          </form>
        }
      />
    </>
  );
}

export default ProductForm;
