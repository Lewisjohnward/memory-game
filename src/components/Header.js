import {useState} from "react"
import styled from "styled-components"
import {RestartPortal} from "./RestartPortal"
import {NewGameButton, RestartButton} from "../styles/Buttons.styled"

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const OptionContainer = styled.div`
`

const Title = styled.h1`
    color: ${({theme}) => theme.navy};
    font-size: 2rem;
`

export const Header = ({setInitGame, handleRestartGame}) => {
    const [confirmRestart, setConfirmRestart] = useState(false)
    const [confirmNewGame, setConfirmNewGame] = useState(false)
    return (
        <>
            <RestartPortal 
                handleRestartGame={handleRestartGame}
                confirmNewGame={confirmNewGame}
                setConfirmNewGame={setConfirmNewGame}
                confirmRestart={confirmRestart}
                setConfirmRestart={setConfirmRestart}
                setInitGame={setInitGame}
        />
                <Container>
                <Title>memory</Title>
                    <OptionContainer>
                    <RestartButton onClick={() => setConfirmRestart(true)}>Restart</RestartButton>
                    <NewGameButton onClick={() => setConfirmNewGame(true)}>New Game</NewGameButton>
                    </OptionContainer>
        </Container>
        </>
    )
}
