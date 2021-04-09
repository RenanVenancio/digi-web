import styled from "styled-components";

export const Subtotal = styled.h1`
  font-size: 1.6em;
`;

export const Row = styled.div`
  display: flex;
  flex: 1;
  justify-content: ${(props) => (props.center ? "center" : "start")};
  flex-direction: row;
  @media (max-width: 660px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const Col = styled.div`
  width: ${(props) => props.width + "px"};
  padding: ${(props) => props.padding + "px"};
  justify-content: ${(props) => (props.center ? "center" : "start")};
  display: flex;
  flex: 1;
  flex-direction: column;
`;
