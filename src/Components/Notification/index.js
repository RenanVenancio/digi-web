import React, { useEffect, useState } from "react";
import { Notification as Alert } from "react-rainbow-components";
// import { Container } from './styles';

function Notification({ visible, title, description }) {
  const [isOpen, setIsOpen] = useState(visible);

  const alertStyle = {
    position: "fixed",
    top: "100px",
    right: "30px",
    zIndex: "9999999999",
  };

  useEffect(() => {
    setIsOpen(visible);
    setTimeout(() => {
      setIsOpen(false);
    }, 4000);
  }, [visible]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <Alert
          style={alertStyle}
          onRequestClose={handleClose}
          title={title}
          description={description}
          icon="success"
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Notification;
