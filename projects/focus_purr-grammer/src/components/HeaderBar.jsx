import React from "react";
import './HeaderBar.css'
function HeaderBar({ score, energy }) {
    return (
        <div className = 'header-bar'>
            <div className="score">Score: {score}</div>
            <div className="energy">Energy: {energy}</div>
        </div>
    )
}

export default HeaderBar;