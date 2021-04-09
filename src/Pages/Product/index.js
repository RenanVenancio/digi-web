import React from "react";

import ProductForm from "../../Components/ProductForm";

function Product(props) {
  return (
    <>
      <ProductForm id={props.match.params.id} />
    </>
  );
}

export default Product;
