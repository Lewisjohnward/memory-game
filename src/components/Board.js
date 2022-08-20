import {useState, useEffect} from "react"
import styled from "styled-components"
import {v4 as uuidv4} from "uuid"



const GridWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const GridContainer = styled.div`
    display: grid;
    grid-gap: 4px;
    margin: auto;
    grid-template-columns: ${({gridSize}) => `repeat(${gridSize}, 1fr)`};
    justify-items: center;
`

const PlayerContainer = styled.div`
    display: flex;
    justify-content: space-around;
`

const PlayerDiv = styled.div`
    background: ${({theme}) => theme.navy};
    text-align: center;
    padding: 10px 20px;
    border-radius: 3px;
    color: white;
`


const iconSize = 60

export const Board = ({
    theme,
    players,
    gridSize,
    setInitGame,
    setConfirmRestart
}) => {
    const [gridArr, setGridArr] = useState([])


    const [guessCount, setGuessCount] = useState(0)

    const tiles = gridSize * gridSize
    const uniqueNums = tiles / 2

    const min = 1
    const max = 99
    const randomNum = () => Math.floor(Math.random() * (max - min + 1) + min)

    const arr = new Array(tiles).fill(0).map(d => {
        return (
            {
                key: uuidv4(),
                num: randomNum(),
                found: false
            }
        )
    })

    const width = gridSize * iconSize
    useEffect(() => {
        setGridArr(arr)
    }, [])

    useEffect(() => {
    }, [])

    const compare = () => {
    }
    return (
        <>
            <GridWrapper>
                <GridContainer gridSize={gridSize} width={width}>
                    {gridArr.map(d => <Icon key={d.key} found={d.found} number={d.num} guessCount={guessCount} setGuessCount={setGuessCount}/>)}
                </GridContainer>
            </GridWrapper>
            <Player />
        </>
    )
}

const Player = () => {
    return (
        <PlayerContainer>
            <PlayerDiv>
                <div>P1</div>
                <div>0</div>
            </PlayerDiv>
            <PlayerDiv>
                <div>P2</div>
                <div>0</div>
            </PlayerDiv>
            <PlayerDiv>
                <div>P3</div>
                <div>0</div>
            </PlayerDiv>
            <PlayerDiv>
                <div>P4</div>
                <div>0</div>
            </PlayerDiv>
        </PlayerContainer>
    )
}

const IconStyled = styled.div`
    height: ${iconSize}px;
    width: ${iconSize}px;
    background: ${({theme, guess, found}) => found ? theme.orange : guess ? theme.silver : theme.navy};
    border-radius: 50px;
    font-weight: bold;
    font-size: 1.6rem;
    color: white;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &:hover{
        cursor: pointer;
    }
`
const Icon = ({number, found, guessCount, setGuessCount}) => {
    const [guess, setGuess] = useState(false)

    return (
        <IconStyled found={found} guess={guess} onClick={() => setGuess(true)}>{number}</IconStyled>   
    )
}
