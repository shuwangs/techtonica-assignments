import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameBoard from './components/GameBoard'

function App() {

  return (
    <>
      <div className="app-container">
      <GameBoard />
    </div>
    </>
  )
}

export default App
