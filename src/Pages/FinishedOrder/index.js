import React from "react";
import { Button } from "react-rainbow-components";
import { Link } from "react-router-dom";

import image from "../../Assets/successpurchase.svg";
import BackgroundImage from "../../Components/BackgroundImage";
import { Row } from "./styles";

function FinishedOrder(props) {
  return (
    <>
      <BackgroundImage asset={image} text="Agradecemos pela sua preferência!   :)" />
      <Row center>
        <Link
          to={`/${props.match.params.company}/orders`}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <Button variant="brand" label="Meus Pedidos" />
        </Link>
      </Row>
    </>
  );
}

export default FinishedOrder;
