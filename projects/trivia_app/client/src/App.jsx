import React, { useState } from 'react';
import GameSetup from './components/GameSetup.jsx';

import './App.css'

function App() {
  const onSubmit = () => {
    console.log("submitted");
  }

  return (
    <>
      <div>Welcome to the quize corner</div>

      <GameSetup onSubmit={onSubmit} />
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
    </>
  )
}

export default App;
