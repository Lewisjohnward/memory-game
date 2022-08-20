import {useState, useEffect} from "react"
import styled from "styled-components"

const Container = styled.div`
    position: absolute;
    right: 0;
    display: flex;
    opacity: 0.6;

    > * {
        margin-right: 5px;
    }
`

const Size = () => {

    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            const height = window.innerHeight
            setDimensions({
                width,
                height
            })
            console.log(`Resized to: ${width}, ${height}`)
        }

        window.addEventListener('resize', handleResize)
    }, [])

    const device = () => dimensions.width <= 320 ? "mobile" : dimensions.width <= 768 ? "Tablet" : "Desktop"

    return (
        <Container>
            <div>
                {dimensions.width}
            </div>
            <div>
                x
            </div>
            <div>
                {dimensions.height}
            </div>
            <div>
                {device()}
            </div>
        </Container>
    )
}

export default Size
