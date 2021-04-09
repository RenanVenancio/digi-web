import React, { useContext } from "react";

import { ApplicationContext } from "../../Contexts/ApplicationContext";
import ClientForm from "../ClientForm";
import DeliveryFormData from "../DeliveryFormData";
import ProductCartList from "../ProductCartList";

function OrderSummary({submitOrder, freightCost}) {
  const { company } = useContext(ApplicationContext);
  return (
    <>
      <ClientForm readOnly={false} showFooterButtons={false} card={false}/>
      <DeliveryFormData company={company} readOnly={true} showFooterButtons={false}/>
      <ProductCartList handleNextClick={submitOrder} freightCost={freightCost} additionalValue={freightCost}/>
    </>
  );
}

export default OrderSummary;
