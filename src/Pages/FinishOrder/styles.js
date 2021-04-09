import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex: 1;
  justify-content: ${(props) => (props.center ? "center" : "start")};
  flex-direction: row;
  margin: ${(props) => (props.margin ? props.margin + "px" : "auto")};
`;

export const Col = styled.div`
  padding: ${(props) => props.padding + "px"};
  justify-content: ${(props) => (props.center ? "center" : "start")};
  display: flex;
  flex-direction: column;
`;
