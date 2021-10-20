import ColoringImageExercise from "./ColoringImageExercise";


function ColoringAnImageHome() {

    const handleClick = () =>{
        document.getElementById("hide-button").hidden = true;
        document.getElementById("exercise").hidden = false;
    }

    return(
        <div>
            <h2>Coloring an Image</h2>
            <p>Rules of the exercise:</p>
            <ul>
                <li>Rule 1:</li>
            </ul>
            <button onClick={handleClick} id="hide-button" >Begin Exercise</button>
            <ColoringImageExercise />
        </div>
    )
}

export default ColoringAnImageHome