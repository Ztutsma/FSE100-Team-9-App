import Canvas from "./Canvas";
import {useState} from "react";
import '../../Styles/Exercise.css'
import {Button, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

/*
* Possible Additions:
*  Add transition to next graph once user has "completed" one
*  Add more lines to follow
* */

class LineFunction {
    xStart
    xEnd
    lineFunction
    constructor(xStart, xEnd, lineFunction) {
        this.xStart = xStart
        this.xEnd = xEnd
        this.lineFunction = lineFunction
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
        this.coordinates = []

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

LineGraphs[2] = new LineGraph()
LineGraphs[2].addLineFunction(0,400, (x)=>{return 0})

function TracingLinesExercise() {

    const [currentLineGraph, setCurrentLineGraph] = useState(LineGraphs[1])

    // List of all coordinates in the exercise
    const [graphCoords, setGraphCoords] = useState({array: currentLineGraph.graphCoordinates()})

    // X and Y offset of the graph
    let xOffset = 20
    let yOffset = 20

    // Cursor control variables
    const [circlePos, setCirclePos] = useState({x: xOffset, y:yOffset})
    const [wasInitialized, setWasInitialized] = useState(false)


    const drawBackground = (ctx) => {

        if (!wasInitialized) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

            ctx.beginPath()
            ctx.moveTo(20, 20)
            for (let i = 1; i < graphCoords.array.length; i++) {
                ctx.lineTo(xOffset + graphCoords.array[i].x, yOffset + graphCoords.array[i].y)
            }
            ctx.stroke()
            setWasInitialized(true)
        }
    }
    

    const drawCircle = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'

        ctx.beginPath()
        ctx.arc(circlePos.x, circlePos.y, 20, 0, 2*Math.PI)
        ctx.fillStyle = "rgba(0,0,0,0)"
        ctx.fill()
        ctx.stroke()
    }


    // Game Control ==================================================
    let mouseX
    let mouseY
    let prevPoint
    let nearestPoint
    let tempPoint
    let dist_prevPoint
    let dist_nearestPoint
    let dist_tempPoint

    const [isDragging, setIsDragging] = useState(false)
    const [nearestPointIndex, setNearestPointIndex] = useState(0)
    const [gameHasEnded, setGameHasEnded] = useState(false)
    const [timesAwayFromLine, setTimesAwayFromLine] = useState(0)
    const [stillAwayFromLine, setStillAwayFromLine] = useState(false)
    const [colorChangeTime, setColorChangeTime] = useState(1000)

    const getCircleDistanceToPoint = (pt) => {
        return Math.sqrt(((circlePos.x - 20) - pt.x)**2 + ((circlePos.y - 20) - pt.y)**2)
    }

    const getNearestPoint = () => {
        prevPoint = graphCoords.array[nearestPointIndex]
        dist_prevPoint = getCircleDistanceToPoint(prevPoint)

        // closest point found
        nearestPoint = prevPoint
        dist_nearestPoint = dist_prevPoint

        let newIndex = 0

        // Find next closest point
        for (let i = 0; i < graphCoords.array.length; i++) {
            tempPoint = graphCoords.array[i]
            dist_tempPoint = getCircleDistanceToPoint(tempPoint)

            if (dist_tempPoint < dist_nearestPoint) {
                nearestPoint = tempPoint
                dist_nearestPoint = dist_tempPoint
                newIndex = i
            }
        }

        // set new nearest point
        if (nearestPoint !== prevPoint) {
            setNearestPointIndex(newIndex)
            dist_prevPoint = dist_nearestPoint
        }

        if (nearestPointIndex === graphCoords.array.length - 1 && dist_prevPoint <= 20) {
            setGameHasEnded(true);
        }

        return dist_prevPoint
    }

    const handleMouseDown = (e) => {
        setIsDragging(true)
    }

    const handleMouseMove = (e) => {
        if (!wasInitialized) return
        if (!gameHasEnded) {
            const rect = e.target.getBoundingClientRect()
            if (isDragging) {
                mouseX = e.clientX - rect.left
                mouseY = e.clientY - rect.top

                setCirclePos({x: mouseX, y: mouseY})
            }

            dist_prevPoint = getNearestPoint();

            // If cursor is too far from the line, change background color to red and start timer
            if(dist_prevPoint > 20) {
                setColorChangeTime(Date.now)
                document.getElementById("game-background").style.background = "#FFCCCC"
                if (!stillAwayFromLine) {
                    setTimesAwayFromLine(timesAwayFromLine + 1)
                    setStillAwayFromLine(true)
                }
            } else {
                // Only change back to white if user has spent 150 ms on line to prevent flashing
                if (Date.now() - colorChangeTime > 150) {
                    document.getElementById("game-background").style.background = "WHITE"
                }
                if (stillAwayFromLine) {
                    setStillAwayFromLine(false)
                }
            }

            return
        }

        document.getElementById("game-background").style.background = "#5cb85c"
    }

    const handleMouseUp = (e) => {
        setIsDragging(false)

        // Reset cursor back to line if it is too far from line when mouse is released
        prevPoint = graphCoords.array[nearestPointIndex]
        dist_prevPoint = Math.sqrt(((circlePos.x - 20) - prevPoint.x)**2 + ((circlePos.y - 20) - prevPoint.y)**2)
        if(dist_prevPoint > 20) {
            setCirclePos({x: prevPoint.x + xOffset, y: prevPoint.y + yOffset})
        }
    }

    return(
        <div id="exercise" hidden>
            <div id="stage" hidden>
                <Row>
                    <h3>Times the line was not followed: {timesAwayFromLine}</h3>
                </Row>
                <Canvas height="402" width="602" id="game-foreground"
                        onMouseDown={(e) => handleMouseDown(e)}
                        onMouseUp={(e) => handleMouseUp(e)}
                        onMouseMove={(e) => handleMouseMove(e)}
                        draw={drawCircle}/>
                <Canvas height="400" width="600" id="game-background"
                        draw={drawBackground}/>

            </div>
            <Row>
                <LinkContainer to="/Home" className="exercise-button">
                    <Button>Back to Home</Button>
                </LinkContainer>
            </Row>
        </div>
    )
}

export default TracingLinesExercise