import PropTypes from "prop-types";
import React from "react";

import nophoto from "../../Assets/nophoto.png";
import { Card, Col, Description, Image, Price, Row, Titile } from "./styles";

function DigiCard({ title, description, price, imageUrl, onClick }) {
  return (
    <Card onClick={onClick}>
      <Col>
        <Row center>
          <Image src={imageUrl} />
        </Row>
        <Col padding={10}>
          <Titile>{title}</Titile>
          {description !== null ? (
            <Description>{description}</Description>
          ) : null}
          {price !== null ? (
            <Price>
              R$
              {price.toLocaleString("pt-br", {
                minimumFractionDigits: 2,
              })}
            </Price>
          ) : null}
        </Col>
      </Col>
    </Card>
  );
}

DigiCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.number,
  imageUrl: PropTypes.string,
  onClick: PropTypes.func,
};

DigiCard.defaultProps = {
  price: null,
  description: null,
  imageUrl: nophoto,
};

export default DigiCard;
