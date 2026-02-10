import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import QuizCard from '../components/QuizCard';
import axios from 'axios';
const SESSION_KEY = "trivia_active_game"
const GameInterface = ({gameQuestions}) =>{
    const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "{}");
    const questions = gameQuestions.length > 1 ? gameQuestions : (saved.questions || []);
    const navigate = useNavigate();
    const [currentIdx, setCurrentIdx] = useState(saved.currentIdx ?? 0);
    const [userAnswers, setUserAnswers] = useState(saved.userAnswers ?? []);
    const selectedForCurrent = userAnswers[currentIdx]?.userSelected ?? [];

    // Deal with page refresh, save the question and currentIdx and userAnwers in localStorage
    useEffect(()=>{
        if (!gameQuestions || gameQuestions.length === 0) {
            return;
        }

        sessionStorage.setItem("trivia_active_game", 
            JSON.stringify({
            questions: gameQuestions,
            currentIdx: currentIdx,
            userAnswers: userAnswers
        }))

    },[questions, currentIdx, userAnswers])

    if (!questions || questions.length === 0) {
        return <p>Loading questions...</p>;
    }

    const handleAnswer = (selectedOption) =>{
        const currentAnswer = {
            question: questions[currentIdx].question,
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
        if (currentIdx < questions.length - 1) {
            setCurrentIdx(currentIdx + 1);
        }
    } 

    const submitToBackend = async () =>{
        if (userAnswers.length < questions.length) {
            alert("Please answer all questions before submitting!");
            return;
        }   

        try {
            const response = await axios.post('/api/result',
                {userAnswers: userAnswers}
            )
            const analyzedData = response.data;

            sessionStorage.removeItem(SESSION_KEY)

            navigate('/result', { state: analyzedData });

        } catch(err) {
            console.error(err);
        }

    }


    return (
        <div className='gameInterface-container'>
            <div className='page-header'>
                <h1>Quiz Time!</h1>
                <p>Question: {currentIdx + 1} / {questions.length}</p>
            </div>

            <QuizCard 
                eachQuiz={questions[currentIdx]}
                selectedAnswer={selectedForCurrent}
                onAnswerSelected={handleAnswer}
                onPrevious={handlePrevious}
                onNext={handleNext}
                currentIdx={currentIdx}
                totalQuestions={questions.length}
                onSubmitAnswers={submitToBackend}

             />
        </div>

    )
}

export default GameInterface;