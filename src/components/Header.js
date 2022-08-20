import {useState} from "react"
import styled from "styled-components"
import {RestartPortal} from "./RestartPortal"

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
const Button = styled.button`
    background: ${({theme}) => theme.silver};
    color: ${({theme}) => theme.navy};
    padding: 0.6em 1.1em;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 2em;

    &:hover{
        cursor: pointer;
    }

    margin: 5px;
`
const RestartButton = styled(Button)`
    background: ${({theme}) => theme.orange};
    color: white;
`

export const Header = ({setInitGame}) => {
    const [confirmRestart, setConfirmRestart] = useState(false)
    return (
        <>
            <RestartPortal 
                confirmRestart={confirmRestart}
                setConfirmRestart={setConfirmRestart}
                setInitGame={setInitGame}
        />
                <Container>
                <Title>memory</Title>
                    <OptionContainer>
                    <RestartButton onClick={() => setConfirmRestart(true)}>Restart</RestartButton>
                    <Button onClick={() => setInitGame(true)}>New Game</Button>
                    </OptionContainer>
        </Container>
        </>
    )
}
