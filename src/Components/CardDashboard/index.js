import PropTypes from "prop-types";
/* eslint-disable no-script-url, jsx-a11y/anchor-is-valid */
import React from "react";

//import Card from "react-rainbow-components/components/Card";

import { Col, Row, StyledCard } from "./styles";

export default function CardDashboard(props) {
  const { title, icon, value } = props;

  return (
    <StyledCard>
      <Row>
        <Col align="center">{icon}</Col>
        <Col style={{ flex: 1 }}>
          <Row align={"flex-end"}>
            <h3 style={{ color: "#898989" }}>{title}</h3>
          </Row>
          <Row align={"flex-end"}>
            <h2 style={{ fontSize: "1.8em" }}>{value}</h2>
          </Row>
        </Col>
      </Row>
    </StyledCard>
  );
}

CardDashboard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.object,
  value: PropTypes.node,
};

CardDashboard.defaultProps = {
  title: undefined,
  component: {},
  value: undefined,
};
