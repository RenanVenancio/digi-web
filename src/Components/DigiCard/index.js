import PropTypes from "prop-types";
import React from "react";

import nophoto from "../../Assets/nophoto.png";
import { Card, Col, Description, Image, OffPercent, Price, Row, SmallThrough, Titile } from "./styles";

function DigiCard({
  title,
  description,
  price,
  promotionalPrice,
  imageUrl,
  onClick,
}) {
  return (
    <Card onClick={onClick}>
      <Col>
        <Image src={imageUrl} />
        <Col padding={10} style={{ borderTop: "1px solid #eaeaea" }}>
          <Titile>{title}</Titile>
          {description !== null ? (
            <Description>{description}</Description>
          ) : null}
          {price !== null && promotionalPrice === null ? (
            <Price>
              R$
              {price.toLocaleString("pt-br", {
                minimumFractionDigits: 2,
              })}
            </Price>
          ) : null}

          {price !== null && promotionalPrice !== null ? (
            <>
              <SmallThrough>
                R$
                {price.toLocaleString("pt-br", {
                  minimumFractionDigits: 2,
                })}
              </SmallThrough>
              <Row>
                <Price>
                  R$
                  {promotionalPrice.toLocaleString("pt-br", {
                    minimumFractionDigits: 2,
                  })}
                </Price>
                <OffPercent>
                  {Math.trunc(100 - (promotionalPrice / price) * 100)}% OFF
                </OffPercent>
              </Row>
            </>
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
  promotionalPrice: PropTypes.number,
  imageUrl: PropTypes.string,
  onClick: PropTypes.func,
};

DigiCard.defaultProps = {
  price: null,
  promotionalPrice: null,
  description: null,
  imageUrl: nophoto,
};

export default DigiCard;
