import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    
    html {
        z-index: -100;
        height: 100%;
        background-color: #ebebeb !important;
    }

    body {
        height: 100%
    }

    button {
        cursor: pointer;
    }

    .swal-toast {
        z-index: 9999999999;
    }

    #root {
        height: 100% !important;
    }
`;

export default GlobalStyle;
