import React from 'react';
import './Controls.css';

function Controls ({gameStatus, onStart, onPause, onReset}) {

  return (
    <div className='control-area'>
      <button id="startBtn" onClick= {onStart} 
      disabled ={gameStatus === "running"}>Start</button>

      <button id="pauseBtn" onClick= {onPause}
      disabled ={gameStatus !== "running"}>Pause</button>

      <button id="resetBtn" onClick= {onReset}
      disabled={gameStatus === "idle"}>Reset</button>
    </div>
  )
}
export default Controls;