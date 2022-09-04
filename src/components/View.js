import {useState} from "react"
import styled from "styled-components"
import {Setup} from "./Setup"
import {Board} from "./Board"
import {Header} from "./Header"


const Padding = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 5px;
    height: 100%;

    @media (min-width: 650px){
        padding: 10px 400px;
        height: 93%;
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
