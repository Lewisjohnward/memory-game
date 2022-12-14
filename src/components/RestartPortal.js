import {useState} from "react"
import styled from "styled-components"
import ReactDOM from "react-dom"

const modalPlaceholderElement = document.getElementById("modal-placeholder")

const Wrapper = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100vh;
    width: 100vw;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
`


const Container = styled.div`
    padding: 20px 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: white;
    border-radius: 5px;

    > * {
        margin-bottom: 15px;
    }
`
const Title = styled.h1`
    color: ${({theme}) => theme.navy};
    font-size: 1em;
`


const Flex = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`
const Button = styled.button`
    background: ${({theme}) => theme.silver};
    color: ${({theme}) => theme.navy};
    padding: 0.6em 2.1em;
    font-weight: bold;
    border-radius: 2em;

    &:hover{
        cursor: pointer;
    }

`

const RestartButton = styled(Button)`
    background: ${({theme}) => theme.orange};
    color: white;
`



export const RestartPortal = ({handleRestartGame, setConfirmNewGame, confirmNewGame, confirmRestart, setConfirmRestart, setInitGame}) => {
    if(confirmRestart === false && confirmNewGame === false) return null

    return ReactDOM.createPortal(
        <Component 
            handleRestartGame={handleRestartGame}
            setConfirmRestart={setConfirmRestart}
            setConfirmNewGame={setConfirmNewGame}
            confirmNewGame={confirmNewGame}
            setInitGame={setInitGame}
        />
        , modalPlaceholderElement
    )
}

const Component = ({handleRestartGame, setConfirmNewGame, confirmNewGame, setConfirmRestart, setInitGame}) => {

    const handleRestart = () => {
        setConfirmNewGame(false)
        setConfirmRestart(false)
        if(confirmNewGame) setInitGame(true)
        else handleRestartGame()

    }


    const handleCancel = () => {
        setConfirmNewGame(false)
        setConfirmRestart(false)
    }

    return (
        <Wrapper>
            <Container>
                <Title>
                    Are you sure you want to {confirmNewGame ? "start a new game" : "restart"}?
                </Title>
                <Flex>
                    <RestartButton onClick={() => handleRestart()}>{ confirmNewGame ? "new game" : "restart" }</RestartButton>
                    <Button onClick={() => handleCancel()}>Cancel</Button>
                </Flex>
            </Container>
        </Wrapper>
    )
}
