import styled from 'styled-components';

export const Row = styled.div`
    display: flex;
    flex: 1;
    justify-content: ${props => props.center ? "center": "start"};
    flex-direction: row;
    @media(max-width: 640px) {
        flex-direction: column;
    }
`

export const Col = styled.div`
    padding: ${props => props.padding + "px"};
    justify-content: ${props => props.center ? "center": "start"};
    display: flex;
    flex-direction: column;
`