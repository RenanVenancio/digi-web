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
