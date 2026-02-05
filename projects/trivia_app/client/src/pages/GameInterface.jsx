import React, {useState} from 'react';
import QuizCard from '../components/QuizCard';

const GameInterface = ({gameQuestions}) =>{
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
        setUserAnswers([...userAnswers, currentAnswer])
         
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

    const submitToBackend = () =>{
        console.log(userAnswers);
        //TODO:  include an operation to submit the results to the backend

    }

    const currentQuiz = gameQuestions[0];
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