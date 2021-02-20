import React from "react";
import ProductItemList from "../../Components/ProductItemList";

export default function Product(props) {
  return (
      <ProductItemList
        category={props.location.search}
        company={props.match.params.company}
      />
  );
}
