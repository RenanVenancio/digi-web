import styled from 'styled-components';

export const Card = styled.div`
    border: 0;
    display: flex;
    padding: ${props => props.padding + "px"};
    border-radius: 20px;
    background-color: #fff;
    margin-top: 10px;
    margin-bottom: 10px;
    max-width: 250px;
    cursor: pointer;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    @media(max-width: 800px) {
        max-width: 360px;
        margin-left: auto;
        margin-right: auto;
    }
    @media(max-width: 760px) {
        max-width: 80%;
        max-width: 30
    }
`

export const Image = styled.img`
    height: 150px; 
    width: 100%; 
    object-fit: cover;
    border-radius: 20px;
    transition: all .5s;
    @media(max-width: 800px) {
        height: 220px; 
    }
    @media(max-width: 690px) {
        height: 170px; 
    }
`
export const Titile = styled.h1`
margin-top: 5px;
    font-size: 1.2em;
`

export const Description = styled.p`
    margin-top: 5px;
    margin-bottom: 8px;
    font-size: 1.1em;
    color: #c4c4c4;
`

export const Price = styled.h2`
    margin-top: auto;
    margin-bottom: 8px;
    font-size: 1.9em;
`

export const Row = styled.div`
    display: flex;
    flex: 1;
    justify-content: ${props => props.center ? "center": "start"};
    flex-direction: row;
`

export const Col = styled.div`
    padding: ${props => props.padding + "px"};
    justify-content: ${props => props.center ? "center": "start"};
    display: flex;
    flex-direction: column;
`

export const Container = styled.div`
    max-width: 80%;
    display: grid;
    margin: auto;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    ${Card} {
        width:100%;
    }
    @media(max-width: 830px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media(max-width: 690px) {
        max-width: 90%;
        grid-template-columns: repeat(1, 1fr);
    }
`
