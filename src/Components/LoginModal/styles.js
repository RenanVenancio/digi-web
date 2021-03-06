import styled from 'styled-components';

export const Image = styled.img`
    height: 320px; 
    width: auto; 
    object-fit: cover;
    border-radius: 20px;
    transition: all .5s;
    margin-left: auto;
        margin-right: auto;
    @media(max-width: 800px) {
        height: 210px; 
    }
`
export const QuantityContainer = styled.div`
    display: flex;
    flex-direction: row;
    input {
        width: 6rem;
        margin-left: 5px;
        margin-right: 5px;
    }
`

export const FooterContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media(max-width: 510px) {
        flex-direction: column;
        align-items: center; 
    }
`

export const Subtotal = styled.h1`
    font-size: 2em;
    color: #3dba4c;
`

export const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
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