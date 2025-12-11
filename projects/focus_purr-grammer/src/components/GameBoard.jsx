import React, { useState, useEffect } from "react";
import HeaderBar from "./HeaderBar";
import CatPlayer from "./CatPlayer";
import Controls from "./Controls";
import FallingItems from "./FallingItems";
import './GameBoard.css';
import { ITEM_CONFIG } from "../config/ItemConfig";

// =========== States & Props ===========
// GameBoard will manage the main states of the game such as score, energy, items, cat position, and whether the game is playing or paused.
// These states will be updated based on user interactions and game events.
const BOARD_WIDTH = 500;
const BOARD_HEIGHT = 600;
const CAT_WIDTH = 60;
const ITEM_SIZE = 40;
const CAT_SPEED = 20;
const INITIAL_ITEM_SPEED = 4;
const SPAWN_RATE = 0.1;
let itemCounter = 0;

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


    // ========== UseEffects ==============
    useEffect(() => {
        console.log("something changed!");
    }, [score, energy, gameStatus]);

    // Use effect to control cat movement
    useEffect(()=>{
        window.addEventListener('keydown', handleKeyDown);
        return()=> {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [gameStatus]);

    // useEffect call the falling items
    useEffect(() => {
        if (gameStatus !== "running") return;
        const intervalId = setInterval(() => {
            itemFalling();  
        }, 50);

        return () => clearInterval(intervalId);
    }, [gameStatus]);

    // Create random items
    // Helper: Calculate Speed
    const itemSpeed = (score) => {
        if (score < 50) return INITIAL_ITEM_SPEED;
        if (score < 100) return INITIAL_ITEM_SPEED * 2;
        if (score < 150) return INITIAL_ITEM_SPEED * 3;
        return INITIAL_ITEM_SPEED * 4;
    }
    // Helper: Create Random Item
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

    // SetItems 
    const itemFalling = () => {
        setItems(prevItems =>{
            let next = prevItems.map(item => ({
                ...item,
                itemY: item.itemY + item.itemSpeed
            }));
            let visible = next.filter(
                item => item.itemY < BOARD_HEIGHT + ITEM_SIZE
            );

            // Add new items to falling;
            if (Math.random() < SPAWN_RATE) {
                visible = [...visible, createRandomItem()];
            }
            return visible;
        })
    }

    // ========== Handle Cat Moves =========
    const handleKeyDown =(event) => {
        console.log(`${event.key}. is pressed`);
        if(gameStatus !== "running") return;

        if(event.key === "ArrowLeft") {
            setCatPosition((prevState) => Math.max(0, prevState - CAT_SPEED))
        } else if(event.key === "ArrowRight") {
            setCatPosition((prevState) => Math.min(BOARD_WIDTH-CAT_WIDTH, prevState + CAT_SPEED))
        }
    }

    // ========== Button Fucntions =========
    const handleStart = () => {
        if(gameStatus === "idle" || gameStatus === "over") {
            setScore(0);
            setEnergy(100);
            setItems([]);
            setCatPosition(BOARD_WIDTH / 2 - CAT_WIDTH / 2);
        }
        setGameStatus("running");
        console.log(gameStatus);

        // TODOS:  Game running Logic
    }

    const handlePause = () => {
        if (gameStatus !== "running") return;
        setGameStatus("paused");
        console.log(gameStatus);

        // TODOS:  Game Pause Logic
    }

    const handleReset = () => {
        setGameStatus("idle");
        setScore(0);
        setEnergy(100);
        setItems([]);
        setCatPosition(BOARD_WIDTH / 2 - CAT_WIDTH / 2);
        console.log(gameStatus);

        // TODOS:  Game Reset Logic
    }


    // ========== Returning Functions =========
    return (
        <div className="game_board" 
            tabIndex="0"
            onKeyDown={handleKeyDown}>
            <h1>Focus! Purr-grammer</h1>
            <HeaderBar score={score} energy={energy} />

            <div className = "playing_area"
                >
                {/* <FallingItems /> */}
                {items.map((item)=> (
                    <FallingItems 
                    key= {item.id}
                    type= {item.type}
                    itemX={item.itemX}
                    itemY={item.itemY}
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