import {iconArr} from "../styles/Icons.styled.js"
import {v4 as uuidv4} from "uuid"

export const generateGrid = (iconSize, gridSize) => {
    console.log("its me")
    const tiles = gridSize * gridSize
    const uniqueNums = tiles / 2

    const min = 1
    const max = 99
    const randomNum = () => Math.floor(Math.random() * (max - min + 1) + min)
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
    return arr
}

export const initPlayers = (players) => new Array(players).fill(0).map((d, i) => ({id: uuidv4(), player: i + 1, score: 0}))
