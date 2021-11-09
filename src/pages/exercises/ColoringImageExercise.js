import Canvas from "../../components/exercises/Canvas";
import {drawMouse} from "../../components/exercises/Animals";
import {useState} from "react";
import '../../Styles/Exercise.css'
import {Row} from "react-bootstrap";

/*
* Possible Additions:
*  Add more animals to color in
*  Add button for switching to new animal to color in
*  Add color variants for animals
* */

let canvasWidth = 600
let canvasHeight = 400
// Array of animals that are drawable
let Animals = [
    {
        name: "mouse",
        shapes: [
            {
                shape: "circle",
                x: canvasWidth/3,
                y: canvasHeight/4,
                radius: 60
            },
            {
                shape: "circle",
                x: 2*canvasWidth/3,
                y: canvasHeight/4,
                radius: 60
            },
            {
                shape: "triangle",
                points: [
                    {
                        x: canvasWidth/3,
                        y: canvasHeight/4
                    },
                    {
                        x: 2*canvasWidth/3,
                        y: canvasHeight/4
                    },
                    {
                        x: canvasWidth/2,
                        y: canvasHeight*3/4,
                    }
                ]
            },
        ],
        drawAnimal: (ctx, colorsOn = true) => drawMouse(ctx, colorsOn)
    },
]

function ColoringImageExercise() {

    let animal = Animals[0]

    const [fgWasInitialized, setFgWasInitialized] = useState(false)
    const [bgWasInitialized, setBgWasInitialized] = useState(false)
    const [isDragging, setIsDragging] = useState(false)

    let mouseX
    let mouseY
    let mouseInBounds = false
    let progressBarColor = "Green"

    // Draw fully colored animal onto background
    const drawBackground = (ctx, frameCount) => {
        if(!bgWasInitialized){
            //drawMouse(ctx)
            animal.drawAnimal(ctx)
            setBgWasInitialized(true)
        }
    }

    // Cover fully colored animal with white shapes
    // Color will be revealed as the white shapes are erased
    const drawForeground = (ctx, frameCount) => {
        if(!fgWasInitialized){
            //drawMouse(ctx, false)
            animal.drawAnimal(ctx, false)
            setFgWasInitialized(true)

            ctx.beginPath()
            ctx.fillRect(canvasWidth/4, 0, canvasWidth/2, canvasHeight/30)
            progressBarColor = "GREEN"
            ctx.fillStyle = progressBarColor
            ctx.fill()
        }

        if (isDragging) {
            ctx.clearRect(mouseX - 10, mouseY - 10, 20, 20)

            ctx.beginPath()
            ctx.fillRect(canvasWidth/4, 0, canvasWidth/2, canvasHeight/30)
            ctx.fillStyle = progressBarColor
            ctx.fill()
        }
    }

    // Algorithm for finding if point is in triangle ==================================
    const sign = (pt1, pt2, pt3) => {
        return (pt1.x - pt3.x) * (pt2.y - pt3.y) - (pt2.x - pt3.x) * (pt1.y - pt3.y)
    }

    const PointInTriangle = (pt, v1, v2, v3) => {
        let d1, d2, d3
        let has_neg, has_pos

        d1 = sign(pt, v1, v2)
        d2 = sign(pt, v2, v3)
        d3 = sign(pt, v3, v1)

        has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0)
        has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0)

        return !(has_neg && has_pos)
    }
    // End of algorithm ===============================================================

    const checkMouseInBounds = (mouseX, mouseY) => {
        let isInBounds = false
        let currentShape
        for (let i = 0; i < animal.shapes.length; i++) {

            if(isInBounds) break;
            currentShape = animal.shapes[i]

            // Check if mouse is within the radius of the circle
            if (currentShape.shape === "circle") {
                if (Math.sqrt((currentShape.x - mouseX)**2 + (currentShape.y - mouseY)**2) < currentShape.radius)
                    isInBounds = true
            }

            // Check if mouse is within triangle
            if (currentShape.shape === "triangle") {
                isInBounds = PointInTriangle({x: mouseX, y: mouseY}, ...currentShape.points)
            }
        }
        return isInBounds
    }

    const handleMouseDown = (e) => {
        setIsDragging(true)
    }

    const handleMouseUp = (e) => {
        setIsDragging(false)
    }


    const [totalTime, setTotalTime] = useState("0")
    let numTotalTime
    let startTime
    let timerRunning = false
    let seconds
    let milliseconds

    const handleMouseMove = (e) => {
        if(isDragging) {
            const rect = e.target.getBoundingClientRect()

            mouseX = e.clientX - rect.left
            mouseY = e.clientY - rect.top

            // Set color of progress bar depending on if mouse is in bounds or not
            mouseInBounds = checkMouseInBounds(mouseX, mouseY)
            if(!mouseInBounds) {
                startTime = Date.now()
                timerRunning = true
                progressBarColor = "Red"
            } else {
                if (timerRunning) {
                    milliseconds = Date.now() - startTime
                    numTotalTime = parseFloat(totalTime)
                    numTotalTime += milliseconds/1000
                    setTotalTime(numTotalTime.toFixed(3))
                    timerRunning = false

                    //totalTime += milliseconds
                }

                progressBarColor = "Green"
            }
        }
    }

    return(
        <div id="exercise" hidden>
            <Row>
                <h3>Time Spent Out of Bounds: {totalTime}</h3>
            </Row>
            <div id="stage" hidden>
                <Canvas height="402" width="602" id="game-foreground"
                        onMouseDown={(e) => handleMouseDown(e)}
                        onMouseUp={(e) => handleMouseUp(e)}
                        onMouseMove={(e) => handleMouseMove(e)}
                        draw={drawForeground}/>
                <Canvas height="400" width="600" id="game-background" draw={drawBackground}/>
            </div>
        </div>
    )
}

export default ColoringImageExercise