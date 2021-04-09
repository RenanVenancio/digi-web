import React, { useState, useEffect } from "react";
import { Modal } from "react-rainbow-components";
import CategoryForm from "../CategoryForm";

function CategoryModal({ id, isOpen, onRequestClose }) {
  
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
      <CategoryForm id={id} />
    </Modal>
  );
}

export default CategoryModal;
