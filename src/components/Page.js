import styled from "styled-components"
import {Game} from "./game/Game"

const Frame = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const Container = styled.div`
    background: ${({theme}) => theme.background};
    height: 80%;
    width:  80%;
    padding: 30px 25px;
`

export const Page = () => {
    return (
        <Frame>
            <Container>
                <Game />
            </Container>
        </Frame>
    )
}
