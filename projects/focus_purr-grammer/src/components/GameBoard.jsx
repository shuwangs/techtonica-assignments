import React from "react";
import { useState } from "react";
import HeaderBar from "./HeaderBar";
import CatPlayer from "./CatPlayer";
import Controls from "./Controls";
import FallingItems from "./FallingItems";
import './GameBoard.css';
import { ITEM_CONFIG } from "../config/ItemConfig";
// import FallingItems from "./FallingItems";

// =========== States & Props ===========
// GameBoard will manage the main states of the game such as score, energy, items, cat position, and whether the game is playing or paused.
// These states will be updated based on user interactions and game events.
const BOARD_WIDTH = 500;
const CAT_WIDTH = 60;
const ITEM_SIZE = 40;
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

    // Create random items
    let itemCounter = 0;
    const itemSpeed = (score) => {
        if (score < 50) return 2;
        if (score < 100) return 4;
        if (score < 150) return 6;
        return 8;
    }
    const createRandomItem = () => {
        const types = Object.keys(ITEM_CONFIG);
        const randomIdx = Math.floor((Math.random() * types.length));
        const randomType = types[randomIdx];
        const speed = itemSpeed(score);
        return {
            id: itemCounter++,
            type: randomType,
            itemX: Math.floor(Math.random() * (BOARD_WIDTH - ITEM_SIZE)),
            itemY: -ITEM_SIZE,
            itemSpeed: speed
        }
    }




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



    // ========== Returning Functions =========
    return (
        <div className="game_board">
            <h1>Focus! Purr-grammer</h1>
            <HeaderBar score={score} energy={energy} />

            <div className = "playing_area">
                {/* <FallingItems /> */}
                {items.map((item)=> (
                    <FallingItems 
                    key= {item.id}
                    type= {item.type}
                    itemX={item.X}
                    itemY={item.Y}
                    />
                ))}


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