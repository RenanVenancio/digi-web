import React from "react";
import { Card } from "react-rainbow-components";
import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex: 1;
  justify-content: ${(props) =>
    props.align !== null && typeof props.align !== "undefined"
      ? props.align
      : "start"};
  flex-direction: row;
`;

export const Col = styled.div`
  padding: ${(props) => props.padding + "px"};
  justify-content: ${(props) =>
    props.align !== null && typeof props.align !== "undefined"
      ? props.align
      : "start"};
  display: flex;
  flex-direction: column;
`;

export const StyledCard = styled(Card)`
  flex: 1;
  max-width: 280px;
  margin-bottom: 10px;
  padding-top: 19px;
  padding-bottom: 19px;
  padding-left: 22px;
  padding-right: 22px;
  @media (max-width: 830px) {
    width: 100%;
    max-width: 89%;
    margin: 20px;
    margin-top: 5px;
    margin-bottom: 5px
  }
`;
