import styled from "styled-components"

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    padding: 25px;
`

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
`

const OptionContainer = styled.div`
`

const Title = styled.h1`
    color: ${({theme}) => theme.navy};
    font-size: 1em;
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

    margin: 5px;
`
const RestartButton = styled(Button)`
    background: ${({theme}) => theme.orange};
    color: white;
`
const GridContainer = styled.div`
    display: grid;
    background: red;
`


export const Board = ({
    theme,
    players,
    gridSize,
    setInitGame
}) => {
    return (
        <Wrapper>
            <Container>
                <Title>memory</Title>
                <OptionContainer>
                    <RestartButton>Restart</RestartButton>
                    <Button onClick={() => setInitGame(true)}>New Game</Button>
                </OptionContainer>
            </Container>
            <GridContainer>
            </GridContainer>
        </Wrapper>
    )
}

