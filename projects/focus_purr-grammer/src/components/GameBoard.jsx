import React from "react";
import { useState } from "react";
import HeaderBar from "./HeaderBar";
import CatPlayer from "./CatPlayer";
import Controls from "./Controls";
import './GameBoard.css';
// import FallingItems from "./FallingItems";

// =========== States & Props ===========
// GameBoard will manage the main states of the game such as score, energy, items, cat position, and whether the game is playing or paused.
// These states will be updated based on user interactions and game events.
const BOARD_WIDTH = 500;
const CAT_WIDTH = 60;
function GameBoard() {
    // =========== Core States ===========
    const [score, setScore] = useState(0);
    const [energy, setEnergy] = useState(100);

    // Game Status can be idle, running, paused, over
    const [gameStatus, setGameStatus] = useState('idle');

    // =========== Cat Status ===========
    const [catPosition, setCatPosition] = useState(BOARD_WIDTH / 2 - CAT_WIDTH / 2);

    // =========== Falling Items ===========
    const [items, setItems] = useState([]);




    // ========== Button Fucntions =========
    const handleStart = () => {
        if(gameStatus === "idle" || gameStatus === "over") {
            setScore(0);
            setEnergy(100);
            setItems([]);
        }
        setGameStatus("running")

        // TODOS:  Game running Logic
    }

    const handlePause = () => {
        if (gameStatus !== "running") return;
        setGameStatus("paused");
        
        // TODOS:  Game Pause Logic
    }
    
    const handleReset = () => {
        setGameStatus("idles");
        setScore(0);
        setEnergy(100);
        setCatPosition(BOARD_WIDTH / 2 - CAT_WIDTH / 2);

        // TODOS:  Game Reset Logic
    }



    // ========== Returning Fucntions =========
    return (
        <div className="game_board">
            <h1>Focus! Purr-grammer</h1>
            <HeaderBar score={score} energy={energy} />

            <div className = "playing_area">
                {/* <FallingItems /> */}

                <div className="cat_container" style={{left: catPosition}}>
                    <CatPlayer />
                </div>
            </div>

            <Controls
                gameStatus={gameStatus}
                onStart={handleStart}
                onPause={handlePause}
                onReset={handleReset}
            />
        </div>
      
    )
}

export default GameBoard;