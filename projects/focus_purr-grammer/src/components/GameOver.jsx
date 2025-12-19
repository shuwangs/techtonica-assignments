import React from 'react';
import './GameOver.css';

const GameOver = ({score}) =>{
  return (
    <div className='game_over_container'>
      <div className='game_over_text'>
        <h2 >Game Over</h2>
        <p>Final Score: {score}</p>
      </div>
    </div>
  )
}
export default GameOver;