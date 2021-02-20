import styled from "styled-components";

export const TableFooter = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #eff1f5;
  padding: 10px;
`;

export const Row = styled.div`
  display: flex;
  flex: 1;
  justify-content: ${(props) => props.justify === "end" ? "flex-end" : props.justify === "center" ? "flex-center" : "flex-start"};
  flex-direction: row;
`;

export const Col = styled.div`
  padding: ${(props) => props.padding + "px"};
  justify-content: ${(props) => props.justify === "end" ? "flex-end" : props.justify === "center" ? "flex-center" : "flex-start"};
  display: flex;
  flex-direction: column;
`;
