import React from "react";

import OrderDetailsForm from "../../Components/OrderDetailsForm";

function OrderDetail(props) {
  return (
    <>
      <OrderDetailsForm id={props.match.params.id} />
    </>
  );
}

export default OrderDetail;
