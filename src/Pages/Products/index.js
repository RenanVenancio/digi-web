import React from "react";
import ContextLoader from "../../Components/ContextLoader";
import OrderList from "../../Components/OrderList";
import ProductList from "../../Components/ProductList";

function Products(props) {
  return (
    <>
      <ContextLoader company={props.match.params.company} />
      <ProductList />
    </>
  );
}

export default Products;
