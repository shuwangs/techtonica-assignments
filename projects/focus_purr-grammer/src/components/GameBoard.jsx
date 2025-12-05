import React from "react";
import { useState } from "react";
import HeaderBar from "./HeaderBar";
import CatPlayer from "./CatPlayer";
import './GameBoard.css';
// import FallingItems from "./FallingItems";

// =========== States & Props ===========
// GameBoard will manage the main states of the game such as score, energy, items, cat position, and whether the game is playing or paused.
// These states will be updated based on user interactions and game events.

function GameBoard() {
    const [score, setScore] = useState(0);
    const [energy, setEnergy] = useState(100);
    const [catPosition, setCatPosition] = useState({ x: 0, y: 0 });
    const [isPlaying, setIsPlaying] = useState(false);
    const [items, setItems] = useState([]);

    return (
        <div className="game_board">
            <h1>Focus Purr-grammer Game Board</h1>
            <HeaderBar score={score} energy={energy} />

            <div className = "playing_area">
                {/* <FallingItems /> */}

                <div className="cat" style={{ left: catPosition.x, top: catPosition.y }}>
                    <CatPlayer />
                </div>
            </div>
        </div>
    )
}

export default GameBoard;