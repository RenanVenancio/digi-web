import styled from "styled-components";

export const Image = styled.img`
  width: ${(props) =>
    typeof props.height !== "undefined" ? props.height + "px" : "100px"};
  width: ${(props) =>
    typeof props.width !== "undefined" ? props.width + "px" : "auto"};
  object-fit: contain;
  padding: 5px;
  margin-left: auto;
  margin-right: auto;
`;
