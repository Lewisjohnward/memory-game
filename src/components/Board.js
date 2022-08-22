import {useState, useEffect} from "react"
import styled from "styled-components"
import {v4 as uuidv4} from "uuid"
import ReactDOM from "react-dom"
import {BiAnchor} from "react-icons/bi"
import {IoFlaskSharp, IoMdCash, IoMdPaw, IoMdTrophy, IoMdRocket, IoMdGift, IoIosHappy} from "react-icons/io"
import {FaHandPeace} from "react-icons/fa"


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

    const [currentPlayer, setCurrentPlayer] = useState(1)
    const [playersState, setPlayersState] = useState()

    const [endGame, setEndGame] = useState(false)

    const tiles = gridSize * gridSize
    const uniqueNums = tiles / 2

    const min = 1
    const max = 99
    const randomNum = () => Math.floor(Math.random() * (max - min + 1) + min)
    const numArr = new Array(tiles / 2).fill(0).map(d => randomNum())

    let randomNumPos = 0
    const arr = new Array(tiles).fill(0).map((d, i) => {
        if(randomNumPos > (numArr.length - 1)) randomNumPos = 0
        randomNumPos++
        return (
            {
                position: i,
                key: uuidv4(),
                num: numArr[randomNumPos - 1],
                visible: false,
                found: false
            }
        )
    })

    const width = gridSize * iconSize
    useEffect(() => {
        setGridArr(arr)
        const playersArr = new Array(players).fill(0).map((d, i) => ({id: uuidv4(), player: i + 1, score: 0}))
        setPlayersState(playersArr)
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
            //Change state of gridArray
            const gridItem = gridArr.filter(d => {
                if (d.key == guess[0].id) return d
                else if (d.key == guess[1].id) return d
            })
            gridArr[gridItem[0].position].found = true
            gridArr[gridItem[1].position].found = true
            setGridArr([...gridArr])


            //Increment player score
            const newState = playersState
            newState[currentPlayer - 1].score++
            setPlayersState([...newState])
             
            
        }
        else setTimeout(() => hideGuesses(), 700)

        setGuess([])

    }

    const hideGuesses = () => {
        const temp = gridArr.map(d => {
            if(!d.found) {
                return({
                        position: d.position,
                        key: d.key,
                        num: d.num,
                        visible: false,
                        found: d.found
                    })
            }
                else return d
        }
        )
        setGridArr([...temp])
    }


    const toggleVisible = () => {
        const gridItem = gridArr.filter(d => d.key == guess[guess.length - 1].id)
        gridArr[gridItem[0].position].visible = true
        setGridArr([...gridArr])
    }

    const changePlayer = () => {
        if(currentPlayer < playersState.length) setCurrentPlayer(prev => prev + 1)
        else setCurrentPlayer(1)
    }

    const checkEndGame = () => {
        ///TODO


    }

    useEffect(() => {
        if(guess.length == 0) return

        if(guess.length == 2) { 
            compareGuesses() 
            changePlayer()
            checkEndGame()
        }
        toggleVisible()
    }, [guess])


    return (
        <>
            <EndGamePortal endGame={endGame}/>
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
            <Player playersState={playersState} currentPlayer={currentPlayer} />
        </>
    )
}

const PlayerContainer = styled.div`
    display: flex;
    justify-content: center;
`

const PlayerDiv = styled.div`
    background: ${({theme, currentPlayer}) => currentPlayer ? theme.orange : theme.navy};
    padding: 20px 30px;
    border-radius: 5px;
    color: white;
    margin: 0px 10px;

    @media (min-width: 450px){
        margin: 0px 30px;
    }

    @media (min-width: 650px){
        margin: 0px 50px;
    }
`
const Bold = styled.div`
    font-size: 1rem;
`
const Centered = styled.div`
    text-align: center;
`

const Player = ({playersState, currentPlayer}) => {
    if(!playersState) return

    return (
        <PlayerContainer>
            {playersState.map(d => (
                <PlayerDiv
                    key={d.id}
                    currentPlayer={d.player === currentPlayer}
                >
                    <Bold>{d.player}</Bold>
                    <Centered>{d.score}</Centered>
                    </PlayerDiv>

            ))}
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

const modalPlaceholderElement = document.getElementById("modal-placeholder")


export const EndGamePortal = ({endGame}) => {
    if(endGame == false) return null
    return ReactDOM.createPortal(
        <Component 
        />
        , modalPlaceholderElement
    )
}

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

const Component = ({}) => {
    return (
        <Wrapper>
            <Container>
                <Title>Player X has won!</Title>
                <Flex>
                    <RestartButton >Restart</RestartButton>
                    <Button >Cancel</Button>
                </Flex>
            </Container>
        </Wrapper>
    )
}
