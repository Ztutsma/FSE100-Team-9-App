import Canvas from "./Canvas";
import {useState} from "react";
import './../../Styles/TracingLinesExercise.css'

/*
TODO
 Add transition to next graph once user has "completed" one
 Add more lines to follow
*/

class LineFunction {
    xStart
    xEnd
    lineFunction
    constructor(xStart, xEnd, lineFunction) {
        this.xStart = xStart
        this.xEnd = xEnd
        this.lineFunction = lineFunction
        console.log("LineFunc: " + lineFunction(xStart + 2))
    }
}

class LineGraph {
    // List of functions with their start/end points
    lineFunctions = []
    coordinates = []

    constructor() {
        this.lineFunctions = []
        this.coordinates = []
    }

    // Add a function to the "line" the use must follow
    addLineFunction(xStart, xEnd, func) {
        this.lineFunctions[this.lineFunctions.length] = new LineFunction(xStart, xEnd, func)
    }

    // Return list of x/y values along part of graph
    partialGraphCoords(graphIndex) {
        let xStart = this.lineFunctions[graphIndex].xStart
        let xEnd = this.lineFunctions[graphIndex].xEnd
        let lineFunction = this.lineFunctions[graphIndex].lineFunction
        let delta = xEnd - xStart
        let DELTA_LENGTH = 200/this.lineFunctions.length

        for (let i = 0; i <= DELTA_LENGTH; i++) {
            let x = xStart + delta/DELTA_LENGTH*i
            this.coordinates[this.coordinates.length] = {x: x, y: lineFunction(x)}
        }
    }

    // Return list of x/y values along full graph
    graphCoordinates(){

        for (let i = 0; i < this.lineFunctions.length; i++) {
            this.partialGraphCoords(i)
        }

        return this.coordinates
    }

}

// Declare graphs to be used in exercise
let LineGraphs = []
LineGraphs[0] = new LineGraph()
//LineGraphs[0].addLineFunction(0,100, (x)=>{return (.3*x)**2})
LineGraphs[0].addLineFunction(0,400, (x)=>{return .8*x})

LineGraphs[1] = new LineGraph()
LineGraphs[1].addLineFunction(0,100, (x)=>{return .03*(x**2)})
LineGraphs[1].addLineFunction(100,200, (x)=>{return 300})
LineGraphs[1].addLineFunction(200,400, (x)=>{return (-.5*(x-200) + 300)})

function TracingLinesExercise() {

    // List of all coordinates in the exercise
    const [graphCoords, setGraphCoords] = useState({array: LineGraphs[1].graphCoordinates()})

    // X and Y offset of the graph
    let xOffset = 20
    let yOffset = 20

    // Cursor control variables
    const [circlePos, setCirclePos] = useState({x: xOffset, y:yOffset})
    const [wasInitialized, setWasInitialized] = useState(false)
    
    const drawBackground = (ctx, frameCount) => {

        if (!wasInitialized) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

            ctx.beginPath()
            ctx.moveTo(20, 20)
            for (let i = 0; i < graphCoords.array.length; i++) {
                ctx.lineTo(xOffset + graphCoords.array[i].x, yOffset + graphCoords.array[i].y)
            }
            ctx.stroke()
            setWasInitialized(true)
        }
    }
    

    const drawCircle = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'

        ctx.beginPath()

        ctx.arc(circlePos.x, circlePos.y, 20, 0, 2*Math.PI)
        ctx.fillStyle = "rgba(0,0,0,0)"
        ctx.fill()
        ctx.stroke()
    }


    // Control Methods ==================================================
    let mouseX
    let mouseY
    let nearestPoint
    let lastPoint
    let nextPoint
    let dist_nearestPoint
    let dist_lastPoint
    let dist_nextPoint

    const [isDragging, setIsDragging] = useState(false)
    const [nearestPointIndex, setNearestPointIndex] = useState(0)

    const handleMouseDown = (e) => {
        setIsDragging(true)
    }

    const handleMouseMove = (e) => {
        const rect = e.target.getBoundingClientRect()
        if (isDragging) {
            mouseX = e.clientX - rect.left
            mouseY = e.clientY - rect.top

            setCirclePos({x: mouseX, y: mouseY})
        }

        // Get coordinates/distance to current nearest point
        nearestPoint = graphCoords.array[nearestPointIndex]
        dist_nearestPoint = Math.sqrt(((circlePos.x - 20) - nearestPoint.x)**2 + ((circlePos.y - 20) - nearestPoint.y)**2)

        // Debugging Prints
/*        console.log("nearest point index: " + nearestPointIndex)
        console.log("nearest point: " + nearestPoint.x + " " + nearestPoint.y)
        console.log("circle pos: " + circlePos.x + " " + circlePos.y)*/

        // If cursor is too far from the line, change background color to red
        // TODO add sound
        if(dist_nearestPoint > 20) {
            document.getElementById("game-background").style.background = "RED"
        } else {
            document.getElementById("game-background").style.background = "WHITE"
        }

        // Get distance to previous index
        if (nearestPointIndex > 0) {
            lastPoint = graphCoords.array[nearestPointIndex - 1]
            dist_lastPoint = Math.sqrt(((circlePos.x - 20) - lastPoint.x)**2 + ((circlePos.y - 20) - lastPoint.y)**2)
        }

        // Get distance to next index
        if (nearestPointIndex < graphCoords.array.length - 1) {
            nextPoint = graphCoords.array[nearestPointIndex + 1]
            dist_nextPoint = Math.sqrt(((circlePos.x - 20) - nextPoint.x)**2 + ((circlePos.y - 20) - nextPoint.y)**2)
        }

        // Change known nearest point to whichever point is closer
        if (dist_lastPoint < dist_nearestPoint) {
            setNearestPointIndex(nearestPointIndex - 1)
        }
        if (dist_nextPoint < dist_nearestPoint) {
            setNearestPointIndex(nearestPointIndex + 1)
        }
    }

    const handleMouseUp = (e) => {
        setIsDragging(false)

        // Reset cursor back to line if it is too far from line when mouse is released
        nearestPoint = graphCoords.array[nearestPointIndex]
        dist_nearestPoint = Math.sqrt(((circlePos.x - 20) - nearestPoint.x)**2 + ((circlePos.y - 20) - nearestPoint.y)**2)
        if(dist_nearestPoint > 20) {
            setCirclePos({x: nearestPoint.x + xOffset, y: nearestPoint.y + yOffset})
        }
    }

    return(

        <div id="stage" hidden>
            <Canvas height="400" width="600" id="game-foreground"
                    onMouseDown={(e) => handleMouseDown(e)}
                    onMouseUp={(e) => handleMouseUp(e)}
                    onMouseMove={(e) => handleMouseMove(e)}
                    draw={drawCircle}/>
            <Canvas height="400" width="600" id="game-background"
                    draw={drawBackground}/>
        </div>
    )
}

export default TracingLinesExercise