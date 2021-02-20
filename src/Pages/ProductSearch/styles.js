import styled from 'styled-components';

export const Title = styled.h1`
    color: #fff;
`

export const Button = styled.button`
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FA543B;
    padding: 15px;
    border-radius: 4px;
    color: #fff;
`

export const Form = styled.form`
    display: flex;
    flex-direction: row;
    input {
        border: none;
        flex: 1;
        font-size: 16px;
    }
`

export const Card = styled.div`
    box-shadow: 0, 0, 20px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    background-color: #fff;
    border-radius: 20px;
    margin: 10px auto;
    padding: 10px;
`

export const ProductList = styled.div`
    max-width: 800px;
    display: flex;
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
    flex-wrap: wrap;
    justify-content: space-between;
`