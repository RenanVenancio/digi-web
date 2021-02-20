import React, { useContext, useEffect, useState } from "react";
import { CounterInput } from "react-rainbow-components";
import { ApplicationContext } from "../../Contexts/ApplicationContext";

function ProductCounter({ product }) {
  const [quantity, setQuantity] = useState(0);
  const { addProductInCheckout } = useContext(ApplicationContext);

  useEffect(() => {
    setQuantity(product.quantity);
  }, [product]);

  function handleChange(qtd) {
    setQuantity(qtd);
    let newProduct = product;
    product.quantity = qtd - product.quantity;
    addProductInCheckout(newProduct);
  }

  const containerStyles = {
    maxWidth: 220,
  };

  return (
    <CounterInput
      style={containerStyles}
      className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      labelAlignment="center"
      min={1}
      value={quantity}
      onChange={handleChange}
      variant="default"
    />
  );
}

export default ProductCounter;
