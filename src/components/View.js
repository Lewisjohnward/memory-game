import {useState} from "react"
import styled from "styled-components"
import {Setup} from "./Setup"
import {Board} from "./Board"
import {Header} from "./Header"


const Wrapper = styled.div`
    background: white;
    height: 100%;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    > * {
        margin-bottom: 10px;
    }
`

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Title = styled.h1`
    color: ${({theme}) => theme.navy};
    font-size: 1em;
`
const Button = styled.button`
    background: ${({theme}) => theme.orange};
    color: white;
    padding: 1em 2em;
    border-radius: 2em;

    &:hover{
        cursor: pointer;
    }
`
const SelectButton = styled(Button)`
    ${({selected}) => selected && "background: black"};
`

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    justify-items: center;
    outline: 1px solid black;
    height: 80%;
`

const Grid = styled.div`
    outline: 1px solid black;
    height: 80%;
    width: 80%;
    background: black;
    border-radius: 50px;
`

const Text = styled.p`
`

const OptionContainer = styled.div`
`
const PlayerContainer = styled.div`
    display: flex;
`
const Player = styled.div`
    background: black;
    height: 10px;
    width: 10px;
`

const Padding = styled.div`
    padding: 10px 5px;
    display: flex;
    flex-direction: column;
    height: 100%;

    @media (min-width: 650px){
        padding: 10px 100px;
    }

`

export const View = () => {
    const [viewSettings, setViewSettings] = useState(false)
    const [number, setNumber] = useState(4)

    const [initGame, setInitGame] = useState(true)
    const [theme, setTheme] = useState("numbers")
    const [players, setPlayers] = useState(2)
    const [gridSize, setGridSize] = useState(4)





    const arr = new Array(number * number).fill(0)

    const toggleNumber = () => {
        number == 4 ?
            setNumber(8)
            :
            setNumber(4)
    }

    const viewSelector = () => {
        const setup = 
            <Setup 
                setInitGame={setInitGame}
                theme={theme}
                setTheme={setTheme}
                players={players}
                setPlayers={setPlayers}
                gridSize={gridSize}
                setGridSize={setGridSize}
            />
        const main = 
            <Padding>
                <Header 
                    setInitGame={setInitGame}
                />
                <Board
                    setInitGame={setInitGame}
                    theme={theme}
                    players={players}
                    gridSize={gridSize}
            />
            </Padding>
            if(initGame) return setup
            else return main
    }

    return (
        <>
            {viewSelector()}
        </>
    )
}
