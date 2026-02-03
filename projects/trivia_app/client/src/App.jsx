import React, { useState } from 'react';
import GameSetup from './components/GameSetup.jsx';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>Welcome to the quize corner</div>

      <GameSetup />
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
    </>
  )
}

export default App;
