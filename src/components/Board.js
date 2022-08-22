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

    const [guess, setGuess] = useState([])

    const tiles = gridSize * gridSize
    const uniqueNums = tiles / 2

    const min = 1
    const max = 99
    const randomNum = () => Math.floor(Math.random() * (max - min + 1) + min)

    const arr = new Array(tiles).fill(0).map((d, i) => {
        return (
            {
                position: i,
                key: uuidv4(),
                num: randomNum(),
                visible: false,
                found: false
            }
        )
    })

    const width = gridSize * iconSize
    useEffect(() => {
        setGridArr(arr)
    }, [])

    const handleGuess = (id, number) => {
        const guessObj = {
            id,
            number
        }
        setGuess(prev => [...prev, guessObj])
    }

    const compareGuesses = () => {
        if(guess[0].number === guess[1].number)
        {
            const gridItem = gridArr.filter(d => d.key == guess[0].id)
            gridArr[gridItem[0].position].found = true
            setGridArr([...gridArr])
        }
        else hideGuesses()

        setGuess([])

    }

    const hideGuesses = () => {
        const temp = gridArr.map(d => ({position: d.position, key: d.key, num: d.num, visible: false, found: d.found}))
        setGridArr([...temp])
    }


    const toggleVisible = () => {
        const gridItem = gridArr.filter(d => d.key == guess[guess.length - 1].id)
        gridArr[gridItem[0].position].visible = true
        setGridArr([...gridArr])
    }


    useEffect(() => {
        if(guess.length == 0) return

        if(guess.length == 2) setTimeout(() => compareGuesses(), 700)
        toggleVisible()
    }, [guess])


    return (
        <>
            <GridContainer gridSize={gridSize} width={width}>
                {gridArr.map(d => ( 
                    <Icon 
                        key={d.key} 
                        id={d.key}
                        found={d.found} 
                        number={d.num} 
                        handleGuess={handleGuess}
                        visible={d.visible}
                    /> ))}
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
    background: ${({theme, found}) => found ? theme.orange : theme.navy};
    font-size: 1.6rem;
    color: ${({visible}) => visible ? "white" : "transparent"};
    border-radius: 50px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    transition: all 1s;


    &:hover{
        cursor: pointer;
    }
`
const Icon = ({id, number, visible, found, handleGuess}) => {

    return (
        <IconStyled 
            found={found}
            onClick={() => handleGuess(id, number)}
            visible={visible}
        >
            {number}
        </IconStyled>   
    )
}
