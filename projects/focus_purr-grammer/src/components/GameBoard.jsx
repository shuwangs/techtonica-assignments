import React from "react";
import { useState } from "react";
import HeaderBar from "./HeaderBar";
import FallingItems from "./FallingItems";
import CatPlayer from "./CatPlayer";

// =========== States & Props ===========
// GameBoard will manage the main states of the game such as score, energy, items, cat position, and whether the game is playing or paused.
// These states will be updated based on user interactions and game events.
    const [score, setScore] = useState(0);
    const [energy, setEnergy] = useState(100);
    const [catPosition, setCatPosition] = useState({ x: 0, y: 0 });
    const [isPlaying, setIsPlaying] = useState(false);
    const [items, setItems] = useState([]);


function GameBoard() {

    return (
        <div className="game-board">
            <h1>Focus Purr-grammer Game Board</h1>
            <HeaderBar score={score} energy={energy} />

            <div className = "playing-area">
                <FallingItems />

                <div className="cat" style={{ left: catPosition.x, top: catPosition.y }}>
                    <CatPlayer />
                </div>
            </div>
        </div>
    )
}

export default GameBoard;