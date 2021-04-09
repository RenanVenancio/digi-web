import { Card } from "react-rainbow-components";
import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex: 1;
  justify-content: ${(props) => (props.align !== null && typeof props.align !== "undefined" ? props.align : "start")};
  flex-direction: row;
  @media (max-width: 830px) {
    flex-direction: column;
  }
`;

export const Col = styled.div`
  padding: ${(props) => props.padding + "px"};
  justify-content: ${(props) => (props.align !== null && typeof props.align !== "undefined" ? props.align : "start")};
  display: flex;
  flex-direction: column;
`;
