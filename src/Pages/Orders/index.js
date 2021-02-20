import React from "react";
import OrderList from "../../Components/OrderList";
import ContextLoader from "../../Components/ContextLoader";

function Orders(props) {
  return (
    <>
      <ContextLoader company={props.match.params.company} />
      <OrderList />
    </>
  );
}

export default Orders;
