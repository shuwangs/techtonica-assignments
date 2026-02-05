import React, {useState} from 'react';
import { createStaticHandler, useNavigate } from 'react-router-dom';
import QuizCard from '../components/QuizCard';
import axios from 'axios';

const GameInterface = ({gameQuestions}) =>{
    const navigate = useNavigate();
    const [currentIdx, setCurrentIdx] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);

    if (!gameQuestions || gameQuestions.length === 0) {
        return <p>Loading questions...</p>;
    }
    console.log(gameQuestions);

    const handleAnswer = (selectedOption) =>{
        const currentAnswer = {
            question: gameQuestions[currentIdx].question,
            userSelected: selectedOption
        }
        setUserAnswers((prev) =>{
            const updatedAnswer = [...prev];
            updatedAnswer[currentIdx] = currentAnswer;
            return updatedAnswer;
        })
         
        
    }

    const handlePrevious = () =>{
        if (currentIdx > 0) {
            setCurrentIdx(currentIdx - 1);
        }
    }
    const handleNext = ()=>{
        if (currentIdx < gameQuestions.length - 1) {
            setCurrentIdx(currentIdx + 1);
        }
    } 

    const submitToBackend = async () =>{
        if (userAnswers.length < gameQuestions.length) {
            alert("Please answer all questions before submitting!");
            return;
        }   

        try {
            //TODO:  include an operation to submit the results to the backend
            const response = await axios.post('/api/result',
                {userAnswers: userAnswers}
            )
            // TODO: deal with the data back from the backend.
            console.log(response);
            navigate('/result');
        } catch(err) {
            console.error(err);
        }

    }


    return (
        <div className='gameInterface-container'>
            <div className='page-header'>
                <h1>Quiz Time!</h1>
                <p>Question: {currentIdx + 1} / {gameQuestions.length}</p>
            </div>

            <QuizCard 
                eachQuiz={gameQuestions[currentIdx]}
                onAnswerSelected={handleAnswer}
                onPrevious={handlePrevious}
                onNext={handleNext}
                currentIdx={currentIdx}
                totalQuestions={gameQuestions.length}
                onSubmitAnswers={submitToBackend}

             />
        </div>

    )
}

export default GameInterface;