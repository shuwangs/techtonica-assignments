import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
 
import GameSetup from './pages/GameSetup.jsx';
import GameInterface from './pages/GameInterface.jsx';
import GameResult from './pages/GameResult.jsx';
import './App.css'


function App() {

  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  const handleStart = async (userRequestData) => {
    // console.log(userRequestData);
    try{
      setError("");
      const fetchParams  = new URLSearchParams();

      for(const key in userRequestData) {
        if (userRequestData[key] !== "" && userRequestData[key] != null){
          console.log(key);
          console.log(userRequestData[key] );

          fetchParams.append(key, userRequestData[key])

        }
      }
      // console.log(fetchParams.toString());

      const response = await fetch(`/api/game?${fetchParams.toString()}`);
      console.log(response);
      if (!response.ok) {
        setError("");
        throw new Error("Fetch to backend failed");
      }
      const data = await response.json();
      // console.log(data.results);
      setQuestions(data.results);

    } catch(err) {
      console.error(err);
      setError("Failed to start the game, please try again");
    }

  }

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GameSetup onStart={handleStart} />} />
        <Route path='/game' element={<GameInterface gameQuestion={questions} />} />
        <Route path='/result' element={<GameResult />} />
      </Routes>
      
    
    </BrowserRouter>
    
  )
}

export default App;
