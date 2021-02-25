import styled from "styled-components";

export const Nav = styled.nav`
  top: 0px;
  position: fixed;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  width: 100%;
  height: 5rem;
  z-index: 999;
  background-color: #f4f4f2;
  img {
    width: 80px;
    height: 80px;
    margin: 10px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
`;
