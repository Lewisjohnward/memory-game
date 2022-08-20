import styled from "styled-components"


const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    padding: 25px;
`


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

const iconSize = 70

export const Board = ({
    theme,
    players,
    gridSize,
    setInitGame,
    setConfirmRestart
}) => {
    const tiles = gridSize * gridSize
    const arr = new Array(tiles).fill(0).map(d => <Icon />)
    const width = gridSize * iconSize



    return (
        <>
            {theme}:
            {players}:
            {gridSize}
            <GridWrapper>
                <GridContainer gridSize={gridSize} width={width}>
                {arr}
                </GridContainer>
            </GridWrapper>
        </>
    )
}

const IconStyled = styled.div`
    height: ${iconSize}px;
    width: ${iconSize}px;
    background: ${({theme}) => theme.navy};
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
const Icon = () => {
    const max = 100
    const min = 1
    const random = Math.floor(Math.random() * (max - min + 1) + min) 
    return (
        <IconStyled onClick={() => alert(random)}>{random}</IconStyled>
    )
}
