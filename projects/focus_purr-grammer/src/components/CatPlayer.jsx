import React from 'react';
import catImage from '../assets/CatIcon.svg';
import './CatPlayer.css';

function CatPlayer() {
  return (
    <div id="catplayer">
      <img id="cat_icon" src={catImage} alt='catIcon' />
    </div>
  )
}

export default CatPlayer;