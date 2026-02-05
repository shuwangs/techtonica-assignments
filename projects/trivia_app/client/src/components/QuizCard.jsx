import React, {useState} from 'react';
const QuizCard = ({eachQuiz, onAnswerSelected, onPrevious, onNext, currentIdx, totalQuestions,onSubmitAnswers }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [option, setOption] = useState([]);

    const handleOptionClick = (option) => {
        setSelectedAnswer(option);

        // Tell GameInterface the user's choice
        onAnswerSelected(option);
    }
    return (
        <div className="quiz-card">
            <h3 className="quiz-question">{eachQuiz.question}</h3>

            <div className="option-container">
                {eachQuiz.options.map((opt, idx) => (
                    <button
                        key={idx}
                        className="option-btn"
                        onClick={() => handleOptionClick(opt)}
                    >{opt}</button>
                ))}
            </div>

            <div className='next-step'>
                <button onClick={onPrevious} disabled={currentIdx === 0 }>Previous</button>
                {currentIdx < totalQuestions - 1 
                    ? <button onClick={onNext}>Next</button>
                    : <button onClick={onSubmitAnswers}>Submit</button>
                }
            </div>
        </div>
    )
}

export default QuizCard;