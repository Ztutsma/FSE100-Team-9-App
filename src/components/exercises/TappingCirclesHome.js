import TappingCirclesExercise from "./TappingCirclesExercise";


function TappingCirclesHome() {

    const handleClick = () =>{
        document.getElementById("hide-button").hidden = true;
        document.getElementById("exercise").hidden = false;
    }

    return(
        <div>
            <h2>Tapping Circles</h2>
            <p>Rules of the exercise:</p>
            <ul>
                <li>Rule 1:</li>
            </ul>
            <button onClick={handleClick} id="hide-button" >Begin Exercise</button>
            <TappingCirclesExercise />
        </div>
    )
}

export default TappingCirclesHome