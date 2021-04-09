import styled from "styled-components";

export const Row = styled.div`
  margin-top: 20px;
  display: flex;
  flex: 1;
  justify-content: ${(props) => (props.center ? "center" : "start")};
  flex-direction: row;
`;

export const Col = styled.div`
  padding: ${(props) => props.padding + "px"};
  justify-content: ${(props) => (props.center ? "center" : "start")};
  display: flex;
  flex-direction: column;
`;

