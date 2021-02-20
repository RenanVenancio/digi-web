import React, { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Subtotal, Col, Row } from "./styles";
import { Input } from "react-rainbow-components";
import { FaMoneyBill } from "react-icons/fa";

function OrderSubtotal({ otherCosts, variation }) {
  const { checkoutProducts } = useContext(ApplicationContext);
  const [subtotal, setSubtotal] = useState("0,00");

  useEffect(() => {
    sumSubtotal();
  }, [checkoutProducts, otherCosts]);

  function sumSubtotal() {
    let initialValue;
    if (otherCosts !== undefined) {
      initialValue = otherCosts;
    } else {
      initialValue = 0;
    }
    checkoutProducts.products.map((i) => {
      initialValue += i.salePrice * i.quantity;
    });
    setSubtotal(
      initialValue.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      })
    );
  }

  return (
    <>
      {variation === "input" ? (
        <Input
          name="subtotal"
          labelAlignment="left"
          value={subtotal.toLocaleString("pt-br", {
            minimumFractionDigits: 2,
          })}
          label="Total do Pedido"
          variant="shaded"
          readOnly
          type="text"
          icon={<FaMoneyBill />}
          className="rainbow-p-around_medium"
        />
      ) : (
        <Col>
          <Row>Total:</Row>
          <Row>
            <Subtotal>R${subtotal}</Subtotal>{" "}
          </Row>
        </Col>
      )}
    </>
  );
}

export default OrderSubtotal;
