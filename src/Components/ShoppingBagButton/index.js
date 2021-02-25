import React, { useContext, useEffect } from "react";
import { BadgeOverlay } from "react-rainbow-components";
import { FaShoppingCart } from "react-icons/fa";
import { ApplicationContext } from "../../Contexts/ApplicationContext";

function ShoppingBagButton(props) {
  const { updateCheckoutProducts, checkoutProducts, company } = useContext(
    ApplicationContext
  );

  useEffect(() => {
    updateCheckoutProducts(company);
  }, [company]);

  const badgeStyle = {
    backgroundColor: "#01B6F5",
    padding: "10px",
    borderRadius: "300px"
  }

  return (
    <BadgeOverlay
      style={badgeStyle}
      isHidden={checkoutProducts.products.length > 0 ? false : true}
      variant="brand"
      position="bottom-right"
      className="rainbow-m-around_x-large"
      value={
        checkoutProducts.producs !== null &&
        checkoutProducts.products.length > 0
          ? checkoutProducts.products.length
          : 1
      }
    >
      <FaShoppingCart color="#fff" size={18} />
    </BadgeOverlay>
  );
}

export default ShoppingBagButton;
