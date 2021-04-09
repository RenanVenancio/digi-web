import React from "react";
import { Modal } from "react-rainbow-components";

import CompanyLogo from "../CompanyLogo";
import LoginForm from "../LoginForm";
import { Row } from "./styles";

function ModalProduct({ isOpen, onRequestClose }) {

  function handleOnClose() {
    if (onRequestClose !== null || typeof onRequestClose !== "undefined") {
      onRequestClose();
    }
  }

  const modalStyles = {
    maxWidth: "400px",
  };

  return (
    <Modal
      style={modalStyles}
      isOpen={isOpen}
      size="large"
      onRequestClose={handleOnClose}
    >
      <Row center>
        <CompanyLogo />
        <br />
      </Row>
      <LoginForm onRequestLogin={handleOnClose} />
    </Modal>
  );
}

export default ModalProduct;
