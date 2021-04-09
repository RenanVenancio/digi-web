import React, { useContext, useEffect, useState } from "react";
import { FaMoneyBill } from "react-icons/fa";
import { Input } from "react-rainbow-components";

import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Col, Row, Subtotal } from "./styles";

function OrderSubtotal({
  otherCosts,
  variation,
  freightCost,
  additionalValue,
}) {
  const { checkoutProducts } = useContext(ApplicationContext);
  const [subtotal, setSubtotal] = useState("0,00");

  useEffect(() => {
    sumSubtotal();
  }, [checkoutProducts, otherCosts]);

  function sumSubtotal() {
    let initialValue = 0;
    if (typeof additionalValue !== "undefined") {
      initialValue += additionalValue;
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
        <>
          <Col>
            <Row>Frete:</Row>
            <Row>
              <Subtotal>
                R$
                {freightCost.toLocaleString("pt-br", {
                  minimumFractionDigits: 2,
                })}
              </Subtotal>
            </Row>
          </Col>
          <br />
          <Col>
            <Row>Total:</Row>
            <Row>
              <Subtotal>R${subtotal}</Subtotal>{" "}
            </Row>
          </Col>
        </>
      )}
    </>
  );
}

export default OrderSubtotal;
