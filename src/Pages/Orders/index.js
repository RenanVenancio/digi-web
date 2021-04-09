import React from "react";

import OrderList from "../../Components/OrderList";

function Orders(props) {
  return (
    <>
      <OrderList adminPerspective={props.adminPerspective} />
    </>
  );
}

export default Orders;
