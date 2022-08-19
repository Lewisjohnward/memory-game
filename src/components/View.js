import {useState} from "react"
import styled from "styled-components"
import {Setup} from "./Setup"
import {Board} from "./Board"


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
        const board = 
            <Board
                setInitGame={setInitGame}
                theme={theme}
                players={players}
                gridSize={gridSize}
            />
            if(initGame) return setup
            else return board
    }

    return (
        <>
            { viewSelector() }
        </>
    )

    return (
        <Wrapper>
            <Button onClick={() => setInitGame(true)}>
                reset
            </Button>
            {
                initGame ?
                    <>
                        <Title>Game setup</Title>
                        <OptionContainer>
                            <Text>
                                Select Theme
                            </Text>
                            {theme}
                            <SelectButton selected={theme == "numbers"} onClick={() => setTheme("numbers")}>
                                Numbers
                            </SelectButton>
                            <SelectButton selected={theme == "icons"} onClick={() => setTheme("icons")}>
                                Icons
                            </SelectButton>
                        </OptionContainer>
                        <OptionContainer>
                            {players}
                            <Text>
                                Number of players
                            </Text>
                            <SelectButton selected={players == 1} onClick={() => setPlayers(1)}>
                                1
                            </SelectButton>
                            <SelectButton selected={players == 2} onClick={() => setPlayers(2)}>
                                2
                            </SelectButton>
                            <SelectButton selected={players == 3} onClick={() => setPlayers(3)}>
                                3
                            </SelectButton>
                            <SelectButton selected={players == 4} onClick={() => setPlayers(4)}>
                                4
                            </SelectButton>
                        </OptionContainer>
                        <OptionContainer>
                            <Text>
                                Grid Size
                            </Text>
                            <SelectButton selected={gridSize == 4} onClick={() => setGridSize(4)}>
                                4x4
                            </SelectButton>
                            <SelectButton selected={gridSize == 6} onClick={() => setGridSize(6)}>
                                6x6
                            </SelectButton>
                        </OptionContainer>
                        <Button onClick={() => setInitGame(false)}>
                            Start game
                        </Button>
                    </>
                    :
                    viewSettings ?
                        <Container>
                        </Container>
                        :
                        <>
                            <Container>
                                <Title>Memory</Title>
                                <Button onClick={() => setViewSettings(true)}>Menu</Button>
                                <Button onClick={() => toggleNumber()}>Number</Button>
                            </Container>
                            <GridContainer>
                                {arr.map(d => <Grid />)}
                            </GridContainer>
                            <PlayerContainer>
                            </PlayerContainer>

                        </>
            }
        </Wrapper>
    )
}
