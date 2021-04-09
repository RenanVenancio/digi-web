import React from "react";

import { Row } from "../CardDashboard/styles";
import { Col, Image } from "./styles";

// import { Container } from './styles';

function BackgroundImage({ asset, text }) {
  return (
    <Col center>
      <Image height={200} src={asset} />
      <Row align="center">
        <h1 style={{fontSize: "1.3em", paddingTop: "10px"}}>{text}</h1>
      </Row>
    </Col>
  );
}

export default BackgroundImage;
