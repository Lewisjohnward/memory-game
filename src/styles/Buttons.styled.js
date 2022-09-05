import styled from "styled-components"

export const NewGameButton = styled.button`
    background: ${({theme}) => theme.silver};
    color: ${({theme}) => theme.navy};
    padding: 0.6em 1.1em;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 2em;

    &:hover{
        cursor: pointer;
    }

    margin: 5px;
`
export const RestartButton = styled(NewGameButton)`
    background: ${({theme}) => theme.orange};
    color: white;
`
