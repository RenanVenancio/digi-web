import styled from "styled-components";

export const Card = styled.div`
  border: 0;
  display: flex;
  padding: ${(props) => props.padding + "px"};
  border-radius: 10px;
  background-color: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  :hover {
    transition: box-shadow 0.2s ease-in-out;
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 10%), 0 -1px 2px 0 rgb(0 0 0 / 10%);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.46);
  }
`;

export const Image = styled.img`
  height: 150px;
  width: 100%;
  object-fit: cover;
  border-radius: 10px 10px 0px 0px;
  transition: all 0.5s;
  @media (max-width: 800px) {
    height: 220px;
  }
  @media (max-width: 690px) {
    height: 170px;
  }
`;
export const Titile = styled.h1`
  margin-top: 0px;
  font-size: 1.2em;
`;

export const Description = styled.p`
  margin-top: auto;
  margin-bottom: auto;
  font-size: 1.1em;
  color: #c4c4c4;
`;

export const Price = styled.h2`
  margin-top: auto;
  margin-bottom: 8px;
  font-size: 1.9em;
`;

export const SmallThrough = styled.h1`
  margin-top: auto;
  margin-bottom: 0px;
  font-size: 1.2em;
  text-decoration: line-through;
`;

export const OffPercent = styled.h1`
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px;
  font-size: 1em;
  color: #00a650;
  font-weight: bold;
`;

export const Row = styled.div`
  display: flex;
  flex: 1;
  justify-content: ${(props) => (props.center ? "center" : "start")};
  flex-direction: row;
`;

export const Col = styled.div`
  padding: ${(props) => props.padding + "px"};
  justify-content: "center";
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  display: grid;
  margin: auto;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  ${Card} {
    width: 100%;
  }
  @media (max-width: 830px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 690px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
