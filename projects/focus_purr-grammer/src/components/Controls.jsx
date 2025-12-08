import React from 'react';
import './Controls.css';
function Controls () {
  return (
    <div className='control-area'>
      <button id="startBtn">Start</button>
      <button id="pauseBtn">Pause</button>
      <button id="resetBtn">Reset</button>
    </div>
  )
}
export default Controls;