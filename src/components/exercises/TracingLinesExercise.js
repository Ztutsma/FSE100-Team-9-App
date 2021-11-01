import Canvas from "./Canvas";
import * as constants from "constants";
import {useState} from "react";


/*
TODO
 1. Add bezier curve for lines to follow
 2. Draw bezier curves in exercise window
 3. Add formulas to calculate points along bezier curve to use in exercise
 4. Add circle that needs to be kept "on the line"
    - Needs to find the closest point along the bezier curve
 5. Add more curves/lines to follow
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
//LineGraphs[0].addLineFunction(0,40, (x)=>{return (.3*x)**2})
LineGraphs[0].addLineFunction(0,400, (x)=>{return .8*x})

function TracingLinesExercise() {

    // List of all coordinates in the exercise
    const [graphCoords, setGraphCoords] = useState({array: LineGraphs[0].graphCoordinates()})
    //let graphCoords = LineGraphs[0].graphCoordinates();

    // X and Y offset of the graph
    let xCoord = 20
    let yCoord = 20

    // Cursor control variables
    const [circlePos, setCirclePos] = useState({x: xCoord, y:yCoord})
    const [wasInitialized, setWasInitialized] = useState(false)
    const [redrawStart, setRedrawStart] = useState(0)



    const draw = (ctx, frameCount) => {
        ctx.clearRect(circlePos.x - 30, circlePos.y - 30, 60, 60)
        ctx.fillStyle = '#000000'

        if (!wasInitialized) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            ctx.beginPath()
            ctx.moveTo(20, 20)
            for (let i = 0; i < graphCoords.array.length; i++) {
                ctx.lineTo(xCoord + graphCoords.array[i].x, yCoord + graphCoords.array[i].y)
            }
            ctx.stroke()
            setWasInitialized(true)
        }
        else {
            ctx.beginPath()
            let tempX = redrawStart
            while (graphCoords.array[tempX].x < circlePos - 35) {
                tempX++
            }
            while ((circlePos.x - graphCoords.array[tempX].x - 30 < 0) && tempX > 0) {
                tempX--
            }
            setRedrawStart(tempX)
            ctx.moveTo(xCoord + graphCoords.array[redrawStart].x, yCoord + graphCoords.array[redrawStart].y)

            while (graphCoords.array[tempX].x < circlePos.x + 35) {
                ctx.lineTo(xCoord + graphCoords.array[tempX].x, yCoord + graphCoords.array[tempX].y)
                tempX++
            }
            //let redrawStart = graphCoords.array.findIndex((element) => (element.x <= circlePos.x) )

        }



/*      ctx.lineTo(40,40)
        ctx.lineTo(40,20)*/
        ctx.stroke()

        ctx.beginPath()

        ctx.arc(circlePos.x, circlePos.y, 20, 0, 2*Math.PI)
        ctx.fillStyle = "rgba(0,0,0,0)"
        ctx.fill()
        ctx.stroke()
    }


    // Control Methods ==================================================
    let mouseX
    let mouseY
    const [isDragging, setIsDragging] = useState({b: false})

    const handleMouseDown = (e) => {
        setIsDragging({b: true})
    }

    const handleMouseMove = (e) => {
        const rect = e.target.getBoundingClientRect()
        if (isDragging.b) {
            mouseX = e.clientX - rect.left
            mouseY = e.clientY - rect.top

            setCirclePos({x: mouseX, y: mouseY})
        }
    }

    const handleMouseUp = (e) => {
        setIsDragging({b: false})
        setWasInitialized(false)
    }

    return(
        <div id="exercise" hidden>
            <Canvas height="400" width="600" className="eCanvas"
                    onMouseDown={(e) => handleMouseDown(e)}
                    onMouseUp={(e) => handleMouseUp(e)}
                    onMouseMove={(e) => handleMouseMove(e)}
                    draw={draw}/>
        </div>
    )
}

export default TracingLinesExercise