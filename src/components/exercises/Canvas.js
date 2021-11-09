import {useEffect, useRef} from "react";


const Canvas = props => {

    

    const {draw, ...rest} = props
    const canvasRef = useCanvas(draw)

    return <canvas height = {window.innerWidth/3} ref={canvasRef} {...rest}/>
}

const useCanvas = (draw) => {
    const canvasRef = useRef(null)

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        let animationFrameID

        const render = () => {
            draw(context)
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