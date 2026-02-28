import React, { useState, useEffect, useRef, useMemo } from "react";
import HeaderBar from "./HeaderBar";
import CatPlayer from "./CatPlayer";
import Controls from "./Controls";
import FallingItems from "./FallingItems";
import GameOver from './GameOver';
import './GameBoard.css';
import { ITEM_CONFIG } from "../config/ItemConfig";

import BGM from "../assets/sounds/bgm.mp3";
// import ERROR_MUSIC from "../assets/sounds/error.wav";
// import GOOD_MUSIC from "../assets/sounds/success.wav";

// =========== States & Props ===========
// GameBoard will manage the main states of the game such as score, energy, items, cat position, and whether the game is playing or paused.
// These states will be updated based on user interactions and game events.
const BOARD_WIDTH = 400;
const BOARD_HEIGHT = 600;
const CAT_WIDTH = 50;
const ITEM_SIZE = 40;
const CAT_SPEED = 20;
const INITIAL_ITEM_SPEED = 4;
const SPAWN_RATE = 0.08;
let itemCounter = 0;

function GameBoard() {
    // =========== Core States ===========
    const [score, setScore] = useState(0);
    const [energy, setEnergy] = useState(100);
    const [isMuted, setIsMute] = useState(false);

    // Game Status can be idle, running, paused, over
    const [gameStatus, setGameStatus] = useState('idle');
    const [level, setLevel] = useState(1);
    const levelRef = useRef(level);

    // =========== Cat Status ===========
    const [catPosition, setCatPosition] = useState(BOARD_WIDTH / 2 - CAT_WIDTH / 2);

    // =========== Falling Items ===========
    const [items, setItems] = useState([]);

    // Game score is zero while game is 'running'
    const [isScoreZero, setIsScoreZero] = useState(false);

    // ========== UseEffects ==============
    useEffect(() => {
        levelRef.current = level;
    }, [level]);

    // ========== useEffect control sound ============
    const bgmRef = useRef(new Audio(BGM));

    useEffect(() =>{
        const bgm = bgmRef.current;
        bgm.loop = true;
        bgm.muted = isMuted;
        bgm.volume = 0.1;
        if (gameStatus === "running") {
            bgm.play().catch(e => console.log("BGM wating for the music to play:", e));
        } else {
            bgm.pause();
            if (gameStatus === "idle") {
                bgm.currentTime = 0; 
            }
        }
    }, [gameStatus, isMuted]);


    // Use effect to control cat movement
    useEffect(()=>{
        window.addEventListener('keydown', handleKeyDown);
        return()=> {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [gameStatus]);


    // ========== Control Game Speed =========
    useEffect(() =>{
        if (gameStatus !== "running") return;
        const levelTimer = setInterval(() => {
            setLevel(prevLevel => {
            return prevLevel + 1; 
            });
        }, 20000);  

        return ()=>clearInterval(levelTimer);
    }, [gameStatus])


    // useEffect call the falling items
    useEffect(() => {
        if (gameStatus !== "running") return;
        const intervalId = setInterval(() => {
            itemFalling();  
        }, 50);

        return () => clearInterval(intervalId);
    }, [gameStatus]);


    // useEffect handle collison
    useEffect(()=> {
        if (gameStatus !== "running") return;
        items.forEach(item => {
            if (isColliding(item, catPosition)) {
                handleCollision(item);
                
                setItems(prev => prev.filter(i => i.id !== item.id));
            }
        });
    }, [items, catPosition, gameStatus, isMuted, level])

    // ========== Handle GameOver =========
    
    useEffect (() =>{
        if(gameStatus !== "running") return;
        if(energy <= 0 || isScoreZero){
            setGameStatus('over');
        }

    }, [energy, gameStatus, isScoreZero])

    // Create random items
    // Helper: Calculate Speed
    const currentSpeed = useMemo(() => {
        if (level === 1) return INITIAL_ITEM_SPEED;
        if (level === 2) return INITIAL_ITEM_SPEED * 1.5;
        if (level === 3) return INITIAL_ITEM_SPEED * 2;
        if (level === 4) return INITIAL_ITEM_SPEED * 2.5;
        return INITIAL_ITEM_SPEED * 3.5;
    }, [level])

    const speedRef = useRef(INITIAL_ITEM_SPEED);

    useEffect(() => {
        speedRef.current = currentSpeed;
    }, [currentSpeed]);

    // Helper: Create Random Item
    const createRandomItem = (currentItems) => {
        const types = Object.keys(ITEM_CONFIG);
        const randomIdx = Math.floor((Math.random() * types.length));
        const randomType = types[randomIdx];

        // const currentLevel = levelRef.current;
        const speed = speedRef.current;
        console.log(speed);

        const totalColumns = Math.floor(BOARD_WIDTH / ITEM_SIZE);
        const colIndex = Math.floor(Math.random() * totalColumns);
        const newX = colIndex * ITEM_SIZE;

        const isLaneBlocked = currentItems.some(item => 
            Math.abs(item.itemX - newX) < 5 && item.itemY < 40
        );

        if (isLaneBlocked) return null;
        return {
            id: itemCounter++,
            type: randomType,
            itemX: newX,
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
            // const currentLevel = levelRef.current;
            // const currSpeed = currentSpeed;
            // console.log(currSpeed);
            const NEW_SPAWN_RATE = speedRef.current / INITIAL_ITEM_SPEED * SPAWN_RATE
            // console.log(NEW_SPAWN_RATE);
            if (Math.random() < NEW_SPAWN_RATE) {
                const newItem = createRandomItem(prevItems);
                if (newItem) {
                    visible.push(newItem);
                }
            }
            return visible;
        })
    }
    // ========== Handle Collision =========
    const isColliding = (newItem, catPosition) => {
        // Item position
        const itemLeft = newItem.itemX;
        const itemRight = newItem.itemX + ITEM_SIZE;
        const itemTop = newItem.itemY;
        const itemBottom = newItem.itemY + ITEM_SIZE;
        
        // Cat position
        const catLeft = catPosition;
        const catRight = catPosition + CAT_WIDTH;
        const catTop = BOARD_HEIGHT - CAT_WIDTH;
        const catBottom = BOARD_HEIGHT;

        return (itemRight > catLeft && itemLeft < catRight 
            && itemBottom > catTop && itemTop < catBottom
        )
    }

    // ========== Handle Collision =========
    const handleCollision = (collidedItem) => {
        const config = ITEM_CONFIG[collidedItem.type];
        if (config) {
            setScore(prev => Math.max(0, prev + config.score));
            setEnergy(prev => Math.min(100, prev + config.energy));
        }
        if (config.score + score <= 0) setIsScoreZero(true);
        // console.log(`Caught ${config.emoji}! Score: ${config.score},
        //      Energy: ${config.energy}`);
    }

    // ========== Handle Cat Moves =========
    const handleKeyDown =(event) => {
        // console.log(`${event.key}. is pressed`);
        if(gameStatus !== "running") return;

        switch(event.key) {
            case "ArrowLeft":
                setCatPosition((prevState) => Math.max(0, prevState - CAT_SPEED));
                break;
            case "ArrowRight":
                setCatPosition((prevState) => Math.min(BOARD_WIDTH-CAT_WIDTH, prevState + CAT_SPEED));
                break;
            case " ":
                handlePause();
                break;
        }
    }

    // ========== Button Functions =========
    const handleStart = () => {
        if(gameStatus === "idle" || gameStatus === "over") {
            setScore(0);
            setEnergy(100);
            setItems([]);
            setCatPosition(BOARD_WIDTH / 2 - CAT_WIDTH / 2);
            setLevel(1);     
            setIsScoreZero(false);
        }
        setGameStatus("running");
        // console.log(gameStatus);
    }

    const handlePause = () => {
        if (gameStatus !== "running") return;
        setGameStatus("paused");
        // console.log(gameStatus);
    }

    const handleReset = () => {
        setGameStatus("idle");
        setScore(0);
        setEnergy(100);
        setItems([]);
        setCatPosition(BOARD_WIDTH / 2 - CAT_WIDTH / 2);
        setLevel(1);     
        setIsScoreZero(false);
        // console.log(gameStatus);
    }

    const toggleMute = () => {
        return setIsMute(!isMuted);
    }

    // ========== Returning Functions =========
    return (
        <div className="game_board" 
            tabIndex="0"
            onKeyDown={handleKeyDown}>

            <div className="game_instruction_container">
                <p className="game_instructions">
                    Catch bugs and errors: 🐛 🐞 🪱 🚫 <br/>
                    Avoid distractions: 🐭 🧶 🌿
                </p>
            </div>

            <h1 className="game_title">Focus! Purr-grammer</h1>
            <HeaderBar 
                score={score}
                energy={energy}
                isMuted={isMuted}
                level = {level}
                toggleMute={toggleMute}
            />

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
                
                {gameStatus === "over" ? 
                    (<GameOver 
                        score ={score}
                    /> ) : 
                null}

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