import styled from "styled-components"


const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const Header = styled.div`
    color: ${({theme}) => theme.navy};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;


    > * {
        padding: 5px 15px;
        margin: 0px 10px;
        border-radius: 15px;
        font-size: 1.1rem;
    }
`

const RestartButton = styled.button`
    background: ${({theme}) => theme.orange};
    color: white;
`

const NgButton = styled.button`
    background: ${({theme}) => theme.lightgray};
`
const GridContainer = styled.div`
    height: 450px;
    width: 450px;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-gap: 5px;
`
const Square = styled.div`
    width: 100px;
    height: 100px;
    outline: 1px solid black;
    border-radius: 1000px;
`

const PlayerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0px 80px;

`
const Player = styled.div`
    background: ${({theme}) => theme.lightgray};
    padding: 10px;
`

export const Game = () => {
    const gridArr = new Array (16).fill(0)
    return (
        <Container>
            <Header>
                <h1>Memory</h1>
                <ButtonContainer>
                    <RestartButton>Restart</RestartButton>
                    <NgButton>New Game</NgButton>
                </ButtonContainer>
            </Header>
            <GridContainer>
                {gridArr.map(d => <Square />)}
            </GridContainer>
            <PlayerContainer>
                <Player>Player 1</Player>
                <Player>Player 2</Player>
                <Player>Player 3</Player>
                <Player>Player 4</Player>
            </PlayerContainer>
        </Container>
    )
}
