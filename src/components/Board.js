import {NewGameButton, RestartButton} from "../styles/Buttons.styled"
import {useState, useEffect} from "react"
import styled from "styled-components"
import ReactDOM from "react-dom"

import {generateGrid, initPlayers} from "../utils/inits.js"
import {FaCrown} from "react-icons/fa"


const GridContainer = styled.div`
    display: grid;
    grid-gap: 4px;
    margin: 0px auto;
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
    setConfirmRestart,
    restartGame,
    setRestartGame
}) => {
    //Contains the game grid
    const [gridArr, setGridArr] = useState([])

    //Contains the user guessed
    const [guess, setGuess] = useState([])

    //Current player
    const [currentPlayer, setCurrentPlayer] = useState(1)

    //Timer for single player
    const [timerActive, setTimerActive] = useState(false)

    //Tracks players score
    const [playersState, setPlayersState] = useState()

    //When endgame true modal for reset game
    const [endGame, setEndGame] = useState(false)

    //Single player state
    const [time, setTime] = useState(0)
    const [moveCount, setMoveCount] = useState(0)

    //Prevents double clicking
    const [enableGuess, setEnableGuess] = useState(true)

    //Initialises game
    useEffect(() => {
        const arr = generateGrid(iconSize ,gridSize)
        const playersArr = initPlayers(players)
        setGridArr(arr)
        setPlayersState(playersArr)

        if(restartGame) handleRestartGame()
    }, [restartGame])

    const handleRestartGame = () => {
        setCurrentPlayer(1)
        setRestartGame(false)
    }

    //fires when user clicks on icons
    const handleGuess = (id, number) => {
        //Prevents rapid clicking
        if(enableGuess == false) return
        //Prevents clicking on guess twice
        if(id == guess[0]?.id) return

        const guessObj = {
            id,
            number
        }
        setGuess(prev => [...prev, guessObj])
    }

    //Fires when user clicks on icons - compares guesses
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

    //Hides guessed
    const hideGuesses = () => {
        const temp = gridArr.map(d => {
            if(!d.found) {
                return({
                    position: d.position,
                    key: d.key,
                    current: false,
                    num: d.num,
                    icon: d.icon,
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
        gridArr[gridItem[0].position].current = true
        setGridArr([...gridArr])
    }

    const changePlayer = () => {
        if(currentPlayer < playersState.length) setCurrentPlayer(prev => prev + 1)
        else setCurrentPlayer(1)
    }

    const checkEndGame = () => {
        gridArr.filter(d => d.found != true).length == 0 && setEndGame(true)

    }

    const incrementMoveCount = () => setMoveCount(prev => prev + 1)

    useEffect(() => {
        if(guess.length == 0) return

        if(guess.length == 2) { 
            compareGuesses() 
            changePlayer()
            checkEndGame()
            incrementMoveCount()

            delayGuess()

        }
        toggleVisible()
    }, [guess])

    const delayGuess = () => {
        toggleGuess()
        setTimeout(toggleGuess, 1000)
    }
    const toggleGuess = () => setEnableGuess(prev => !prev)


    const incrementTime = () => setTime(prev => prev + 1)


    useEffect(() => {
        if (timerActive) setTimeout(incrementTime, 1000)
    }, [time, timerActive])

    useEffect(() => {
        if(!playersState) return
        if(playersState.length == 1) setTimerActive(true)

    }, [playersState])

    useEffect(() => {
        if(endGame) setTimerActive(false)
    }, [endGame])


    return (
        <>
            <EndGamePortal setInitGame={setInitGame} time={time} endGame={endGame} playersState={playersState}/>
            <GridContainer gridSize={gridSize}>
                {gridArr.map(d => ( 
                    <Icon 
                        iconView={theme === "icons"}
                        icon={d.icon}
                        key={d.key} 
                        id={d.key}
                        current={d.current}
                        found={d.found} 
                        number={d.num}
                        handleGuess={handleGuess}
                        visible={d.visible}
                    /> ))}
            </GridContainer>
            <Player moveCount={moveCount} time={time} playersState={playersState} currentPlayer={currentPlayer} />
        </>
    )
}

const PlayerContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 80%;
    margin: 0 auto;
`

const PlayerDiv = styled.div`
    position: relative;
    background: ${({theme, currentPlayer}) => currentPlayer ? theme.orange : theme.lightgray};
    border-radius: 2px;
    color: ${({theme, currentPlayer}) => currentPlayer ? "white" : theme.navy};
    z-index: -1;
    padding: 10px 20px;

    @media (min-width: 650px){
        width: 200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`
const Bold = styled.div`
    font-size: 1rem;
`
const Score = styled.div`
    font-weight: bold;
    text-align: center;
    font-size: 1.5rem;
`

const PointerDiv = styled(PlayerContainer)`
    position: absolute;
    background: inherit;
    transform: rotate(45deg);
    height: 20px;
    width: 20px;

    top: 0px;
    left: 50%;

    transform: translate(-50%, -50%) rotate(45deg);
`

const CurrentPlayerDiv = styled.div`
    color: ${({theme, currentPlayer}) => currentPlayer ? theme.navy : "transparent"};
    text-align: center;
    margin-top: 10px;
    font-weight: bold;
    letter-spacing: 6px;

    @media (max-width: 650px)
    {
        font-size: 0.8rem;
        letter-spacing: 2px;
        margin-top: 5px;
    }
`

const TurnDiv = styled.div`
`



const Player = ({playersState, currentPlayer, time, moveCount}) => {
    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        window.innerWidth < 451 && setMobile(true)
    }, [])

    if(!playersState) return

    return (
        <PlayerContainer>
            {
                playersState.length == 1 ? 
                    <Soloplayer playersState={playersState} currentPlayer={currentPlayer}  time={time} moveCount={moveCount}/>
                    :
                    <Multiplayer mobile={mobile} playersState={playersState} currentPlayer={currentPlayer} />
            }
        </PlayerContainer>
    )
}

const Multiplayer = ({playersState, currentPlayer, mobile}) => {
    return (
        <>
            {playersState.map(d => (
                <TurnDiv key={d.id} >
                    <PlayerDiv
                        currentPlayer={d.player === currentPlayer}
                    >
                        <PointerDiv />
                        <Bold>{mobile ? "P" : "Player"} {d.player}</Bold>
                        <Score>{d.score}</Score>
                    </PlayerDiv>
                    <CurrentPlayerDiv
                        currentPlayer={d.player === currentPlayer}

                    >
                        Current turn
                    </CurrentPlayerDiv>
                </TurnDiv>
            ))}
        </>
    )
}

const SoloplayerDiv = styled(PlayerDiv)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;
`

const TimeContainer = styled.div`
    font-weight: 700;
    font-size: 1.2rem;
`

const formatTime = (time) => time < 10 ? "0" + time : time

const renderTime = (time) => {
    const mins = Math.floor(time / 60)
    const remaining = formatTime(time - (mins * 60))
    return `${mins}:${remaining}`
}

const Soloplayer = ({playersState, currentPlayer, time, moveCount}) => {
    return (
        <>
            <SoloplayerDiv >
                <Bold>Time</Bold>
                <TimeContainer>{renderTime(time)}</TimeContainer>
            </SoloplayerDiv>
            <SoloplayerDiv >
                <Bold>Moves</Bold>
                <Score>{moveCount}</Score>
            </SoloplayerDiv>
        </>
    )
}

const IconStyled = styled.div`
    background: ${({theme, found, current}) => {
        if(found) return theme.silver
        else if(current) return theme.orange
        else return theme.navy
    }};

    font-size: 1.8rem;
    font-weight: bold;
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

const StyledIcon = styled.div`
    display: flex;
    font-size: 2.5rem;


`
const Icon = ({id, number, visible, found, handleGuess, icon, iconView, current}) => {

    return (
        <IconStyled 
            found={found}
            current={current}
            onClick={() => handleGuess(id, number)}
            visible={visible}
        >
            {iconView ? <StyledIcon>{icon}</StyledIcon> :number}
        </IconStyled>   
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: white;
    border-radius: 5px;
    padding: 15px 30px;

    > * {
        margin-bottom: 20px;
    }
`

const EndGameMessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const FinishMessageStyled = styled.h1`
    color: ${({theme}) => theme.navy};
    font-size: 2em;
`

const GameOverMessage = styled.p`
    font-size: 0.8em;
    color: ${({theme}) => theme.navy};
    opacity: 0.8;
    font-weight: bold;
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

const ScoreContainer = styled.div`
    position: relative;
    width: 100%;
    padding: 15px 20px;
    background: ${({theme}) => theme.silver};
    color: ${({theme}) => theme.navy};
    font-size: 1.2rem;
    display: flex;
    justify-content: space-between;
`

const PlayerScore = styled.div``

const BoldScore = styled.span`
    font-weight: bold;
`

const CrownIco = styled(FaCrown)`
    position: absolute;
    top: -25px;
    left: -8px;
    color: gold;
    font-size: 3rem;

    transform: rotate(-10deg);
`


const modalPlaceholderElement = document.getElementById("modal-placeholder")


export const EndGamePortal = ({endGame, playersState, setInitGame}) => {
    if(endGame == false) return null
    return ReactDOM.createPortal(
        <Component playersState={playersState} setInitGame={setInitGame}/>
        , modalPlaceholderElement
    )
}


const Component = ({playersState, setInitGame}) => {
    if (!playersState) return null

    const sorted = [...playersState].sort((a, b) => a.score > b.score) 
    const winner = sorted[0].player

    const finishMessage = playersState.length === 1 ?
        "Congratulations! You found them all!" 
        :
        `Player ${winner} wins!`


    return (
        <Wrapper>
            <Container>
                <EndGameMessageContainer>
                    <FinishMessageStyled>{finishMessage}</FinishMessageStyled>
                    <GameOverMessage>
                        Game over! Here are the results...
                    </GameOverMessage>
                </EndGameMessageContainer>
                {
                    sorted.map((d, i) => (
                        <ScoreContainer>
                            {i === 0 && <CrownIco />}
                            <PlayerScore>
                                Player : {d.player}
                            </PlayerScore>
                            <PlayerScore>
                                <BoldScore>{d.score} pairs</BoldScore>
                            </PlayerScore>
                        </ScoreContainer>
                    ))}
                <Flex>
                    <NewGameButton onClick={() => setInitGame(true)}>New Game</NewGameButton>
                </Flex>
            </Container>
        </Wrapper>
    )
}
