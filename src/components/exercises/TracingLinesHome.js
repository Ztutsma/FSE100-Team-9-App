import TracingLinesExercise from "./TracingLinesExercise";


function TracingLinesHome() {

    const handleClick = () =>{
        document.getElementById("hide-button").hidden = true;
        document.getElementById("exercise").hidden = false;
    }

    return(
        <div>
            <h2>Tracing Lines</h2>
            <p>Rules of the exercise:</p>
            <ul>
                <li>Rule 1:</li>
            </ul>
            <button onClick={handleClick} id="hide-button" >Begin Exercise</button>
            <TracingLinesExercise />
        </div>
    )
}

export default TracingLinesHome