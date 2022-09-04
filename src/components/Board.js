import {NewGameButton, RestartButton} from "../styles/Buttons.styled"
import {useState, useEffect} from "react"
import styled from "styled-components"
import {v4 as uuidv4} from "uuid"
import ReactDOM from "react-dom"
import {BiAnchor} from "react-icons/bi"
import {IoFlaskSharp, IoMdCash, IoMdPaw, IoMdTrophy, IoMdRocket, IoMdGift, IoIosHappy} from "react-icons/io"
import {FaHandPeace} from "react-icons/fa"
import {FaDelicious, FaCanadianMapleLeaf, FaCarSide, FaDiceTwo, FaHorseHead, FaLemon, FaMask, FaPastafarianism} from "react-icons/fa"


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
    setConfirmRestart
}) => {
    const [gridArr, setGridArr] = useState([])

    const [guess, setGuess] = useState([])

    const [currentPlayer, setCurrentPlayer] = useState(1)
    const [playersState, setPlayersState] = useState()

    const [endGame, setEndGame] = useState(false)

    const [time, setTime] = useState(0)
    const [moveCount, setMoveCount] = useState(0)
    const [enableGuess, setEnableGuess] = useState(true)

    const tiles = gridSize * gridSize
    const uniqueNums = tiles / 2

    const min = 1
    const max = 99
    const randomNum = () => Math.floor(Math.random() * (max - min + 1) + min)
    const iconArr = [
        <BiAnchor />,
        <FaHandPeace />,
        <IoMdCash />,
        <IoMdPaw />,
        <IoMdTrophy />,
        <IoMdRocket />,
        <IoMdGift />,
        <IoIosHappy />,
        <FaDelicious />,
        <FaCanadianMapleLeaf />,
        <FaCarSide />,
        <FaDiceTwo />,
        <FaHorseHead />,
        <FaLemon />,
        <FaMask />,
        <FaPastafarianism />
    ]
    const numArr = new Array(tiles / 2).fill(0).map((d, i) => ({num: randomNum(), icon: iconArr[i]}))

    let randomNumPos = 0
    const arr = new Array(tiles).fill(0).map((d, i) => {
        if(randomNumPos > (numArr.length - 1)) randomNumPos = 0
        randomNumPos++
        return (
            {
                position: i,
                key: uuidv4(),
                num: numArr[randomNumPos - 1].num,
                icon: numArr[randomNumPos - 1].icon,
                current: false,
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
        if(playersState?.length != 1) return
        setTimeout(incrementTime, 1000)
    }, [time, playersState])


    return (
        <>
            <EndGamePortal setInitGame={setInitGame} endGame={endGame} playersState={playersState}/>
            <GridContainer gridSize={gridSize} width={width}>
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
`

const PlayerDiv = styled.div`
    position: relative;
    background: ${({theme, currentPlayer}) => currentPlayer ? theme.orange : theme.lightgray};
    border-radius: 2px;
    color: ${({theme, currentPlayer}) => currentPlayer ? "white" : theme.navy};
    padding: 10px 20px;
    margin: 0px 10px;

    @media (min-width: 650px){
        width: 200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
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
    z-index: -1;
    transform: rotate(45deg);
    height: 20px;
    width: 20px;

    top: 0px;
    left: 50%;

    transform: translate(-50%, -50%) rotate(45deg);
`




const Player = ({playersState, currentPlayer, time, moveCount}) => {
    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        window.innerWidth < 451 && setMobile(true)
    }, [])

    useEffect(() => {
        console.log(mobile)
    }, [mobile])

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
                <>
                    <PlayerDiv
                        key={d.id}
                        currentPlayer={d.player === currentPlayer}
                    >
                        <PointerDiv />
                        <Bold>{mobile ? "P" : "Player"} {d.player}</Bold>
                        <Score>{d.score}</Score>
                    </PlayerDiv>
                    </>
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

const modalPlaceholderElement = document.getElementById("modal-placeholder")


export const EndGamePortal = ({endGame, playersState, setInitGame}) => {
    if(endGame == false) return null
    return ReactDOM.createPortal(
        <Component playersState={playersState} setInitGame={setInitGame}/>
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




const Component = ({playersState, setInitGame}) => {

    const sorted = [...playersState].sort((a, b) => a.score > b.score) 
    const winner = sorted[0].player


    return (
        <Wrapper>
            <Container>
                <Title>Player {winner} has won!</Title>
                <Flex>
                    <RestartButton>Restart</RestartButton>
                    <NewGameButton onClick={() => setInitGame(true)}>New Game</NewGameButton>
                </Flex>
            </Container>
        </Wrapper>
    )
}
