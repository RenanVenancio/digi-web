import React, { useState, useEffect } from "react";
import { Modal } from "react-rainbow-components";
import LoginForm from "../LoginForm";

function ModalProduct(props) {
  const [isOpen, setIsopen] = useState(true);

  function handleOnClose() {
    setIsopen(false);
  }

  useEffect(() => {
    setIsopen(!isOpen);
  }, [props.isOpen]);

  return (
    <Modal isOpen={isOpen} size="large" onRequestClose={handleOnClose}>
      <LoginForm />
    </Modal>
  );
}

export default ModalProduct;
