import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { FaSave, FaTrash } from "react-icons/fa";
import { Button, Input } from "react-rainbow-components";
import Swal from "sweetalert2";
import * as Yup from "yup";

import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Api } from "../../Services/Api";
import Toast from "../../Utils/Toast";
import FileUpload from "../FileUpload";
import { Col, Row } from "./styles";

function CategoryForm({ id }) {
  const { company } = useContext(ApplicationContext);
  const [categoryImage, setCategoryImage] = useState();

  useEffect(() => {
    loadData();
  }, [company, id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
  });

  const loadData = () => {
    if (company !== "" && typeof id !== "undefined") {
      Api.get(`${company}/product/categories/${id}`).then((result) => {
        formik.values.name = result.name;
        formik.values.attachment = result.attachment;
      });
    }
  };

  const submitData = (values) => {
    if (typeof id !== "undefined" || id === null) {
      updateData(values);
    } else {
      saveData(values);
    }
  };

  const updateData = async (values) => {
    if (company !== "") {
      Api.put(`${company}/product/categories/${id}`, {
        name: values.name,
        attachment: categoryImage,
      }).then(() => {
        Toast.fire({
          icon: "success",
          title: "Seus dados foram atualizados com sucesso!",
        });
      });
    }
  };

  const saveData = async (values) => {
    if (company !== "") {
      Api.post(`${company}/product/categories/`, {
        name: values.name,
        attachment: categoryImage,
      }).then(() => {
        Toast.fire({
          icon: "success",
          title: "Seus dados foram salvos com sucesso!",
        });
      });
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: `Deseja deletar ${formik.values.name}?`,
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Sim`,
      denyButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        Api.delete(`${company}/product/categories/${id}`).then(() => {
          Toast.fire({
            icon: "success",
            title: "Categoria removida com sucesso!",
          }).then((e) => {});
        });
      } else if (result.isDenied) {
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      attachment: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      await submitData(values);
    },
  });

  const inputLabelAlign = "left";

  const inputStyles = {
    flex: 1,
  };

  return (
    <>
      {categoryImage}
      <form onSubmit={formik.handleSubmit}>
        <Col center>
          <Row center>
            <FileUpload
              attachmentId={categoryImage}
              setAttachmentId={setCategoryImage}
            />
          </Row>
          <Row center>
            <Input
              id="name"
              labelAlignment={inputLabelAlign}
              name="name"
              label="Nome"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={inputStyles}
              placeholder="Vestuário"
              type="text"
              className="rainbow-p-around_medium"
              error={formik.errors.name ? formik.errors.name : ""}
            />
          </Row>
        </Col>
        <Row center>
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
        </Row>
      </form>
    </>
  );
}

export default CategoryForm;
