import React, { useState, useEffect } from "react";
import { Modal } from "react-rainbow-components";
import CompanyLogo from "../CompanyLogo";
import LoginForm from "../LoginForm";
import { Row } from "./styles";

function ModalProduct(props) {
  const [isOpen, setIsopen] = useState(true);

  function handleOnClose() {
    setIsopen(false);
  }

  useEffect(() => {
    setIsopen(!isOpen);
  }, [props.isOpen]);

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
        <br/>
      </Row>
      <LoginForm />
    </Modal>
  );
}

export default ModalProduct;
