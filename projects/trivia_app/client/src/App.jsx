import React, { useState } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
 
import GameSetup from './pages/GameSetup.jsx';
import GameInterface from './pages/GameInterface.jsx';
import GameResult from './pages/GameResult.jsx';
import './App.css'


function App() {
  const navigate = useNavigate();

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
      // console.log(response);
      if (!response.ok) {
        setError("");
        throw new Error("Fetch to backend failed");
      }
      const data = await response.json();
      // console.log(data);
      setQuestions(data);

      navigate('/game');

    } catch(err) {
      console.error(err);
      setError("Failed to start the game, please try again");
    }

  }

  return (
      <Routes>
        <Route path='/' element={<GameSetup onStart={handleStart} />} />
        <Route path='/game' element={<GameInterface gameQuestions={questions} />} />
        <Route path='/result' element={<GameResult />} />
      </Routes>
  )
}

export default App;
