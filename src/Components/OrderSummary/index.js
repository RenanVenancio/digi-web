import React, { useContext } from "react";
import ClientForm from "../ClientForm";
import DeliveryFormData from "../DeliveryFormData";
import ProductCartList from "../ProductCartList";
import { ApplicationContext } from "../../Contexts/ApplicationContext";

function OrderSummary() {
  const { company } = useContext(ApplicationContext);
  return (
    <>
      <ClientForm readOnly={true} />
      <DeliveryFormData company={company} readOnly={true} />
      <ProductCartList />
    </>
  );
}

export default OrderSummary;
