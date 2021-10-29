import Canvas from "./Canvas";
import './../../Styles/Canvas.css';
import wrongSound from '../../media/buzzer_x.wav';
import correctSound from '../../media/Winning-bell-melody-sound-effect.mp3';
import {Col, Row} from "react-bootstrap";
import {useState} from "react";


function TappingCirclesExercise() {

    // Drawing Logic/Functions =====================================================
    let circleX
    let circleY
    let x_vector = Math.random()
    let y_vector = Math.random()
    let canvasWidth
    let canvasHeight
    let circleRadius
    let wasSet = false

    let colorOptions = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00']
    let circleFill = colorOptions[0]

    const drawCircle = () => {

        newCircleColor()

        // Set circle radius to 1/8 the shorter of height or width
        if (canvasWidth < canvasHeight) {
            circleRadius = canvasWidth/8
        }
        else {
            circleRadius = canvasHeight/8
        }

        // Set circle somewhere within middle of canvas
        circleX = Math.random()
        circleY = Math.random()
        circleX *= (canvasWidth - 2* circleRadius)
        circleY *= (canvasHeight - 2* circleRadius)
        circleX += circleRadius
        circleY += circleRadius
    }

    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = circleFill

        // Set initial position & direction of circle
        if (!wasSet) {
            canvasWidth = ctx.canvas.width
            canvasHeight = ctx.canvas.height

            drawCircle()

            x_vector < .5 ? x_vector = -1 : x_vector = 1
            y_vector < .5 ? y_vector = -1 : y_vector = 1

            wasSet = true
        }

        // Change direction if circle is at border
        if (circleX - circleRadius < 0 || circleX + circleRadius > canvasWidth) x_vector *= -1
        if (circleY - circleRadius < 0 || circleY + circleRadius > canvasHeight) y_vector *= -1

        // Move circle
        circleX += x_vector
        circleY += y_vector

        ctx.beginPath()
        ctx.arc(circleX, circleY, circleRadius, 0, 2*Math.PI)
        ctx.fill()
    }

    const newCircleColor = () => {
        circleFill = colorOptions[Math.floor(Math.random() * colorOptions.length)]
    }


    // Game Logic/Functions =====================================================
    let mouseX
    let mouseY
    const [scores, setScores] = useState({currentScore: 0, bestScore: 0})

    let wrongBuzzer = new Audio(wrongSound)
    let correctBell = new Audio(correctSound)

    const handleClick = (e) => {
        // Get mouse coords in relation to canvas
        const rect = e.target.getBoundingClientRect()
        mouseX = e.clientX - rect.left
        mouseY = e.clientY - rect.top

        // Reset audio if still playing
        correctBell.pause()
        correctBell.currentTime = 0
        wrongBuzzer.pause()
        wrongBuzzer.currentTime = 0

        let newCurrentScore = scores.currentScore

        // If click is within circle
        if(Math.sqrt((circleX - mouseX)**2 + (circleY - mouseY)**2) < circleRadius) {
            correctBell.playbackRate = 2
            correctBell.play()

            // Update Scores
            newCurrentScore++
            if (newCurrentScore >= scores.bestScore) {
                setScores({currentScore: newCurrentScore, bestScore: newCurrentScore})
            }
            else {
                setScores({currentScore: newCurrentScore, bestScore: scores.bestScore})
            }
        }
        // Click was not in circle
        else {
            wrongBuzzer.playbackRate = 2
            wrongBuzzer.play()

            // Set current score to 0
            setScores({currentScore: 0, bestScore: scores.bestScore})
        }
    }


    return (
        <div id="exercise" hidden>
            <Row>
                <Col></Col>
                <Col><h3 className="score-header">Current Score: {scores.currentScore}</h3></Col>
                <Col><h3 className="score-header">Best Score: {scores.bestScore}</h3></Col>
                <Col></Col>
            </Row>
            <Canvas height="400" width="600" className="eCanvas"
                    onClick={(e) => handleClick(e)}
                    draw={draw}
            />
        </div>
    )
}

export default TappingCirclesExercise