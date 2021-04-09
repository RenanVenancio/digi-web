import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex: 1;
  justify-content: ${(props) => (props.center ? "center" : "start")};
  flex-direction: row;
  height: 80%
`;

export const Col = styled.div`
  padding: ${(props) => props.padding + "px"};
  justify-content: ${(props) => (props.center ? "center" : "start")};
  display: flex;
  flex-direction: column;
`;

export const Image = styled.img`
  height: ${(props) =>
    typeof props.height !== "undefined" ? props.height + "px" : "100px"};
  width: ${(props) =>
    typeof props.width !== "undefined" ? props.width + "px" : "auto"};
  object-fit: contain;
  padding: 5px;
  margin-left: auto;
  margin-right: auto;
`;
