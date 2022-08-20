import {createGlobalStyle} from "styled-components"


export const GlobalStyle = createGlobalStyle`
    html{
        font-size: 16px;
        user-select: none;
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
    }

    button{
        border: none;
        background: none;
    }
`
