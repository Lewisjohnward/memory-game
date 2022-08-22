import styled from "styled-components"

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    background: ${({theme}) => theme.navy};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 60px;
`

const Container = styled.div`
    background: white;
    padding: 25px;
    border-radius: 5px;
    
    > * {
        margin-bottom: 15px;
    }

`

const Button = styled.button`
    background: ${({theme}) => theme.silver};
    color: white;
    font-size: 1rem;
    padding: 0.6em 2.1em;
    font-weight: bold;
    border-radius: 2em;

    &:hover{
        cursor: pointer;
    }

    margin: 5px;
`
const SelectButton = styled(Button)`
    ${({selected, theme}) => selected && `background: ${theme.navy}`};
`
const WideButton = styled(SelectButton)`
    width: 50%;
`


const StartButton = styled(Button)`
    background: ${({theme}) => theme.orange};
    width: 100%;
`

const Title = styled.h1`
    color: white;
    font-size: 1.3rem;
    margin-bottom: 70px;
`

const OptionContainer = styled.div`
`
const Flex = styled.div`
    display: flex;
    justify-content: space-around;
`

const Text = styled.p`
    color: ${({theme}) => theme.silver};
    margin-bottom: 2px;
`

export const Setup = ({
    setInitGame,
    theme,
    setTheme,
    players,
    setPlayers,
    gridSize,
    setGridSize,
}
) => {
    return (
        <Wrapper>
            <Title>Memory</Title>
            <Container>
                <OptionContainer>
                <Text>
                    Select Theme
                </Text>
                    <Flex>
                        <WideButton selected={theme == "numbers"} onClick={() => setTheme("numbers")}>
                        Numbers
                        </WideButton>
                        <WideButton selected={theme == "icons"} onClick={() => setTheme("icons")}>
                        Icons
                        </WideButton>
                    </Flex>
                </OptionContainer>
                <OptionContainer>
                <Text>
                    Number of players
                </Text>
                    <Flex>
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
                    </Flex>
                </OptionContainer>
                <OptionContainer>
                <Text>
                    Grid Size
                </Text>
                    <Flex>
                        <WideButton selected={gridSize == 4} onClick={() => setGridSize(4)}>
                        4x4
                        </WideButton>
                        <WideButton selected={gridSize == 6} onClick={() => setGridSize(6)}>
                        6x6
                        </WideButton>
                    </Flex>
                </OptionContainer>
                <StartButton onClick={() => setInitGame(false)}>
                    Start game
                </StartButton>
            </Container>
        </Wrapper>
    )
}
