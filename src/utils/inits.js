import {iconArr} from "../styles/Icons.styled.js"
import {v4 as uuidv4} from "uuid"

export const generateGrid = (iconSize, gridSize) => {
    const tiles = gridSize * gridSize
    const uniqueNums = tiles / 2

    const min = 1
    const max = 99
    const randomNum = () => Math.floor(Math.random() * (max - min + 1) + min)
    const numArr = new Array(uniqueNums).fill(0).map((d, i) => ({num: randomNum(), icon: iconArr[i]}))
    const duplicateArr = numArr.concat(numArr)

    const shuffle = (array) => {
        let m = array.length, t, i

        while(m){
            i = Math.floor(Math.random() * m--)

            t = array[m]
            array[m] = array[i]
            array[i] = t
        }
        return array
    }

    const shuffledArr = shuffle(duplicateArr)


    let randomNumPos = 0
    const arr = new Array(tiles).fill(0).map((d, i) => {
        return (
            {
                position: i,
                key: uuidv4(),
                num: shuffledArr[i].num,
                icon: shuffledArr[i].icon,
                current: false,
                visible: false,
                found: false
            }
        )
    })
    return arr
}

export const initPlayers = (players) => new Array(players).fill(0).map((d, i) => ({id: uuidv4(), player: i + 1, score: 0}))
