import {useState, useEffect} from "react"

const Orientation = () => {
    useEffect(() => {
        const handleOrientationChange = () => console.log(window.orientation)

        window.addEventListener('orientationchange', handleOrientationChange)
    }, [])
}

export default Orientation
