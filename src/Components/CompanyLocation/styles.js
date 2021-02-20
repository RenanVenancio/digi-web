import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  margin-top: ${(props) => props.marginTop + "px"};
  flex: 1;
  justify-content: ${(props) => (props.center ? "center" : "start")};
  flex-direction: row;
`;

export const Col = styled.div`
  padding: ${(props) => props.padding + "px"};
  margin-top: ${(props) => props.marginTop + "px"};
  width: ${(props) => props.width ? props.width : "auto"};
  justify-content: ${(props) => (props.center ? "center" : "start")};
  display: flex;
  flex-direction: column;
`;
