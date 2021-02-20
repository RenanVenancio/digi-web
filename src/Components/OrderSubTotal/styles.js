import styled from "styled-components";

export const Subtotal = styled.h1`
  font-size: 1.6em;
`;

export const Row = styled.div`
  display: flex;
  flex: 1;
  justify-content: ${(props) => (props.center ? "center" : "start")};
  flex-direction: row;
`;

export const Col = styled.div`
  padding: ${(props) => props.padding + "px"};
  justify-content: ${(props) => (props.center ? "center" : "start")};
  display: flex;
  flex: 1;
  flex-direction: column;
`;
