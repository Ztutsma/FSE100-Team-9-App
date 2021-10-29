import Canvas from "./Canvas";


function TracingLinesExercise() {

    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'

        ctx.beginPath()
        ctx.fillRect(20, 20, 100, 200)
        ctx.fill()
    }

    return(
        <div id="exercise" hidden>
            <Canvas height="500" width="500" className="eCanvas" draw={draw}/>
        </div>
    )
}

export default TracingLinesExercise