import {Page} from "./components/Page"
import {GlobalStyle} from "./globalStyles"
import {ThemeProvider} from "styled-components"


const theme = {
    background: "#f5f1d5",
    navy : "#5c57b3",
    orange: "#e0db4c",
    lightgray: "#a8a8a5"
}
const App = () => {
    return(
        <>
            <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Page />
            </ThemeProvider>
        </>
    )
}

export default App
