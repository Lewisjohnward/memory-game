import {useEffect} from "react"
import styled, {ThemeProvider} from "styled-components"
import {GlobalStyle} from "./globalStyles"
import Size from "./utils/Size"
import {View} from "./components/View"


const theme = {
    background: "#f5f1d5",
    navy : "#001f3f",
    orange: "#FF851B",
    lightgray: "#a8a8a5",
    silver: "#d8dae6"
}

const size = {
    mobile: '320px',
    tablet: '768px',
    desktop: '2560px'
}

const device = {
    mobile: `(min-width: ${size.mobile})`,
    tablet: `(min-width: ${size.tablet})`,
    desktop: `(min-width: ${size.desktop})`
}

const StyledApp = styled.div`
    width: 100vw;
    height: ${({height}) => height}px;

    display: flex;
    justify-content: center;
    align-items: center;


    //@media (min-width: 1px) {
    //    background: #FFDC00;
    //}

    ////tablet
    //@media (min-width: 320px){
    //    background: #FF4136;
    //    font-size: 1rem;
    //}

    //@media (min-width: 768px){
    //    background: #01FF70;
    //    font-size: 3rem;
    //}

`

const App = () => {

    const getHeight = () => {
        return window.innerHeight
    }

    return(
        <>
            <Size />
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <StyledApp height={getHeight()}>
                    <View />
                </StyledApp>
            </ThemeProvider>
        </>
    )
}

export default App
