import {useEffect, useRef} from "react";


const Canvas = props => {

    

    const {draw, ...rest} = props
    const canvasRef = useCanvas(draw)

    return <canvas ref={canvasRef} {...rest}/>
}

const useCanvas = (draw) => {
    const canvasRef = useRef(null)

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameID

        const render = () => {
            frameCount++
            draw(context, frameCount)
            animationFrameID = window.requestAnimationFrame(render)
        }

        render()

        return () => {
            window.cancelAnimationFrame(animationFrameID)
        }

    },[draw])

    return canvasRef
}



export default Canvas;