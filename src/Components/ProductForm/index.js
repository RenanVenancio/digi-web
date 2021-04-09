import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { FaBoxes, FaFolderOpen, FaSave, FaTrash } from "react-icons/fa";
import { Avatar, Button, ButtonIcon, Card, Input, Select, Textarea } from "react-rainbow-components";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";

import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api } from "../../Services/Api";
import Toast from "../../Utils/Toast";
import CategoryModal from "../CategoryModal";
import FileUpload from "../FileUpload";
import { Col, Row } from "./styles";

function ProductForm({ id }) {
  const { company } = useContext(ApplicationContext);
  const [productImage, setProductImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [redirect, setRedirect] = useState("");
  const [categoryModalIsOpen, setCategoryModalIsOpen] = useState(false);

  useEffect(() => {
    loadData();
    loadCategories();
  }, [company, id]);

  const loadData = () => {
    if (id && company !== "") {
      Api.get(`${company}/products/${id}`).then((response) => {
        let data = response.data;
        formik.values.id = data.id;
        formik.values.name = data.name;
        formik.values.description = data.description;
        formik.values.costPrice = data.costPrice;
        formik.values.salePrice = data.salePrice;
        formik.values.productCategory = data.productCategory.id;
        setProductImage(response.data.attachment);
      });
    }
  };

  const gotoList = () => {
    setRedirect(`/${company}/admin/products/`);
  };

  const loadCategories = async () => {
    if (company !== "") {
      Api.get(`${company}/product/categories/`).then((response) => {
        let categoriesOptions = [];
        categoriesOptions.push({
          label: "Selecione uma categoria",
          value: null,
        });
        response.data.map((i) => {
          categoriesOptions.push({ label: i.name, value: i.id });
        });
        setCategories(categoriesOptions);
      });
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: `Deseja deletar ${formik.values.name}?`,
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Sim`,
      denyButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        Api.delete(`${company}/products/${id}`).then(() => {
          gotoList();
          Toast.fire({
            icon: "success",
            title: "Produto removido com sucesso!",
          }).then((e) => {});
        });
      } else if (result.isDenied) {
      }
    });
  };

  const validationSchema = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string().min(2, "Tamanho inválido").required("Campo obrigatório"),
    description: Yup.string()
      .min(2, "Tamanho inválido")
      .required("Campo obrigatório"),
    costPrice: Yup.number().required(),
    salePrice: Yup.number().required(),
    productCategory: Yup.number().required("Campo obrigatório"),
  });

  const submitData = async (values) => {
    if (typeof id !== "undefined" && id !== null) {
      Api.put(`/${company}/products/${id}`, {
        name: values.name,
        description: values.description,
        costPrice: values.costPrice,
        salePrice: values.salePrice,
        productCategory: values.productCategory,
        attachment: productImage,
      }).then(() => {
        gotoList();
        Toast.fire({
          icon: "success",
          title: "Seus dados foram atualizados com sucesso!",
        });
      });
    } else {
      Api.post(`/${company}/products/`, {
        name: values.name,
        description: values.description,
        costPrice: values.costPrice,
        salePrice: values.salePrice,
        productCategory: values.productCategory,
        attachment: productImage,
      }).then(() => {
        gotoList();
        Toast.fire({
          icon: "success",
          title: "Produto salvo com sucesso!",
        }).then((e) => {});
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      description: "",
      costPrice: 0.0,
      salePrice: 0.0,
      productCategory: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await submitData(values);
    },
  });

  const setAttachmentId = (id) => {
    setProductImage(id);
  };

  const inputStyles = {
    flex: 1,
  };

  const cardStyle = {
    marginLeft: "auto",
    marginRight: "auto",
  };

  const inputLabelAlign = "left";

  return (
    <>
      {redirect !== "" ? <Redirect push to={redirect} /> : null}
      <CategoryModal
        isOpen={categoryModalIsOpen}
        onRequestClose={() => {
          loadCategories();
          setCategoryModalIsOpen(false);
        }}
      />
      <Card
        style={cardStyle}
        icon={<Avatar icon={<FaBoxes />} />}
        title="Dados do Produto"
        children={
          <>
            <form onSubmit={formik.handleSubmit}>
              <Row>
                <FileUpload
                  attachmentId={productImage}
                  setAttachmentId={setAttachmentId}
                />
                <Col>
                  <Input
                    id="name"
                    labelAlignment={inputLabelAlign}
                    name="name"
                    label="Nome"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={inputStyles}
                    placeholder="Smartphone 6 4GB ram Octa Core 2.2"
                    type="text"
                    className="rainbow-p-around_medium"
                    error={formik.errors.name ? formik.errors.name : ""}
                  />
                  <Textarea
                    id="description"
                    labelAlignment={inputLabelAlign}
                    name="description"
                    rows={3}
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
                </Col>
              </Row>
              <Row>
                <Input
                  id="costPrice"
                  labelAlignment={inputLabelAlign}
                  name="costPrice"
                  label="Preço de Custo"
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
                  labelAlignment={inputLabelAlign}
                  name="salePrice"
                  label="Preço de Venda"
                  value={formik.values.salePrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={inputStyles}
                  placeholder="0,00"
                  type="number"
                  className="rainbow-p-around_medium"
                  error={formik.errors.salePrice ? formik.errors.salePrice : ""}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flex: 1,
                  }}
                >
                  <Select
                    id="productCategory"
                    labelAlignment={inputLabelAlign}
                    name="productCategory"
                    label="Categoria"
                    value={formik.values.productCategory}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={inputStyles}
                    options={categories}
                    type="text"
                    className="rainbow-p-around_medium"
                    error={
                      formik.errors.productCategory
                        ? formik.errors.productCategory
                        : ""
                    }
                  />
                  <ButtonIcon
                    style={{
                      marginTop: "auto",
                      marginBottom: "15px",
                      marginRight: "15px",
                    }}
                    icon={<FaFolderOpen />}
                    variant="border"
                    onClick={() => setCategoryModalIsOpen(true)}
                  />
                </div>
              </Row>
              <Button
                className="rainbow-m-around_medium"
                variant="destructive"
                type="button"
                className="rainbow-m-around_medium"
                onClick={() => handleDelete()}
                disabled={id === null || typeof id === "undefined"}
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

export default ProductForm;
