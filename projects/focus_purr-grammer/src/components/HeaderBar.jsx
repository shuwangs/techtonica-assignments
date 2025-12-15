import React from "react";
import './HeaderBar.css'
function HeaderBar({ score, energy, isMuted, toggleMute }) {
    return (
        <div className = 'header-bar'>
            <div className="score">Score: {score}</div>
            <div className="energy">Energy: {energy}</div>
            <div className="sound_btn_container">
                <button 
                className="sound_btn"
                onClick={toggleMute}
                >{isMuted ? "🔇" : "🔊"}</button>
            </div>

        </div>
    )
}

export default HeaderBar;