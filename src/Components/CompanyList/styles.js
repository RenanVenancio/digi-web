import styled from "styled-components";

export const Card = styled.div`
  border: 0;
  display: flex;
  padding: ${(props) => props.padding + "px"};
  border-radius: 20px;
  background-color: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 250px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

export const Image = styled.img`
  height: 220px;
  width: 100%;
  object-fit: contain;
  border-radius: 20px 20px 0px 0px;
  transition: all 0.5s;
`;
export const Titile = styled.h1`
  margin-top: 5px;
  font-size: 1.2em;
`;

export const Description = styled.p`
border-top: solid 1px #c4c4c4;
  margin-top: 5px;
  margin-bottom: 8px;
  font-size: 1.1em;
  color: #c4c4c4;
`;

export const Price = styled.h2`
  margin-top: auto;
  margin-bottom: 8px;
  font-size: 1.9em;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: auto;
  max-width: 80%;
  ${Card} {
    width: 100%;
  }
  @media (max-width: 830px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Col = styled.div`
  padding: ${(props) => props.padding + "px"};
  justify-content: ${(props) => (props.center ? "center" : "start")};
  display: flex;
  flex-direction: column;
`;
