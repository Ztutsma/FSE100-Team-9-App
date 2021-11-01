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
        let frameCount = 0
        let animationFrameID

        const render = () => {
            frameCount++
            draw(context, frameCount)
            animationFrameID = window.requestAnimationFrame(render)
        }

/*        const handleResize = e => {
            context.canvas.width = window.innerWidth/3
            context.canvas.height = context.canvas.width/1.618
        }*/

        render()
/*        handleResize();
        window.addEventListener("resize", handleResize);*/

        return () => {
            window.cancelAnimationFrame(animationFrameID)
            //window.removeEventListener("resize", handleResize)
        }

    },[draw])

    return canvasRef
}



export default Canvas;