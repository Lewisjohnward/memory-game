import {useEffect} from "react"
import styled, {ThemeProvider} from "styled-components"
import {GlobalStyle} from "./globalStyles"
import Size from "./utils/Size"
import {View} from "./components/View"


const theme = {
    background: "#f5f1d5",
    navy : "#001f3f",
    orange: "#FF851B",
    lightgray: "#dcdedc",
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
