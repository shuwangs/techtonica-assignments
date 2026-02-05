import React, {useState} from 'react';
import QuizCard from '../components/QuizCard';

const GameInterface = ({gameQuestions}) =>{
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);

    if (!gameQuestions || gameQuestions.length === 0) {
        return <p>Loading questions...</p>;
    }
    console.log(gameQuestions);

    const currentQuiz = gameQuestions[0];
    return (
        <div className='gameInterface-container'>
            <div className='page-header'>
                <h1>Quiz Time!</h1>
            </div>

            <QuizCard eachQuiz={currentQuiz} />
        </div>


    )
}

export default GameInterface;