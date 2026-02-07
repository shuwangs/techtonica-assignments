// Third party API fetching -- Open Trivd DB
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.OPEN_TRIVIA_BASE_URL;
console.log(BASE_URL);

const OpenTriviaService = {

    async getGameQuestions (query){
        const params = new URLSearchParams()
        const { amount, category, difficulty, type } = query;

        if (amount) params.append("amount", amount);
        if (category) params.append("category", category);
        if (difficulty) params.append("difficulty", difficulty);
        if (type) params.append("type", type);

        const url=`${BASE_URL}?${params.toString()}`;

        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`OpenTrivia API error: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data)

        return data.results.map(quiz => {
            const formatedCorrectAnswer = Array.isArray(quiz.correct_answer) 
                ? quiz.correct_answer
                : [quiz.correct_answer]

            const options = [...formatedCorrectAnswer, ...quiz.incorrect_answers]
            const shuffledOptions = options.sort(() => Math.random() - 0.5);
            return {
                question: quiz.question,
                type: quiz.type,
                difficulty: quiz.difficulty,
                category: quiz.category,
                options: shuffledOptions,
                correct_answer: quiz.correct_answer
            }
        })

    },

    async getCategories (){
        const catUrl= process.env.OPEN_TRIVIA_CATEGORY_URL;

        const response = await fetch(catUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch categories", response.status);
        }

        const categories = await response.json();

        return categories;
    }
}

export default OpenTriviaService;