export const analyzeQuizResults = (userAnswers, originalQuestions) => {
    let correctCount = 0;

    const details = userAnswers.map(eachAnswer => {

        // find the question in the original question list
        const originalQuestion = originalQuestions.find(
            q => q.question === eachAnswer.question
        );

        const isCorrect = originalQuestion && 
            String(eachAnswer.userSelected).trim() === String(originalQuestion.correct_answer).trim();
        
        if (isCorrect) {
            correctCount++;
        }

        return {
            question: eachAnswer.question,
            userSelected: eachAnswer.userSelected,
            correctAnswer: originalQuestion ? originalQuestion.correct_answer : "N/A",
            isCorrect: !!isCorrect
        };
    });

    return { details, correctCount };
};

