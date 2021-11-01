import Canvas from "./Canvas";


/*
* TODO
*  1. Find/Make simple objects/shapes to color in
*  2. Break objects up into simple shapes and draw on canvas
*  3. Add circle to screen as "paint brush"
*  4. Change color of object as paint brush goes over shapes
* */

function ColoringImageExercise() {

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

export default ColoringImageExercise