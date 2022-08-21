import {useState, useEffect} from "react"
import styled from "styled-components"
import {v4 as uuidv4} from "uuid"



const GridContainer = styled.div`
    display: grid;
    grid-gap: 4px;
    margin: auto;
    grid-template-columns: ${({gridSize}) => `repeat(${gridSize}, 1fr)`};
    width: 340px;
    height: 340px;

    @media (min-width: 450px){
        width: 400px;
        height: 400px;
    }
`

const PlayerContainer = styled.div`
    display: flex;
    justify-content: center;
`

const PlayerDiv = styled.div`
    background: ${({theme}) => theme.navy};
    text-align: center;
    padding: 20px 30px;
    border-radius: 3px;
    color: white;
    margin: 0px 10px;

    @media (min-width: 450px){
        margin: 0px 30px;
    }

    @media (min-width: 650px){
        margin: 0px 50px;
    }
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
            <GridContainer gridSize={gridSize} width={width}>
                {gridArr.map(d => <Icon key={d.key} found={d.found} number={d.num} guessCount={guessCount} setGuessCount={setGuessCount}/>)}
            </GridContainer>
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
    background: ${({theme, guess, found}) => found ? theme.orange : guess ? theme.silver : theme.navy};
    font-size: 1.6rem;
    color: white;
    border-radius: 50px;

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
