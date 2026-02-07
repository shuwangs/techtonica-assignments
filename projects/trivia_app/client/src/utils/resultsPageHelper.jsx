import React from "react";
import axios from 'axios';

const displayExplanation = (data) => {
    return {
        concept: data.concept || "General Knowledge",
        whyCorrect: data.why_correct || "The answer is factually verified.",
        tip: data.tip || "Keep practicing!"
    };
}

export const deleteRow = (currentData, indexToDelete) => {
    return currentData.filter((_, index) => index !== indexToDelete);
}

export const fetchExplanation = async (row) => {
    try {
        const response = await axios.post('/api/explain', {
            question: row.question,
            userSelected: row.userSelected,
            correctAnswer: row.correctAnswer
        })


        console.log( `Below is explanations: ${displayExplanation(response).concept}`);
        console.log( `Below is explanations: ${displayExplanation(response).why_correct}`);
        console.log( `Below is explanations: ${displayExplanation(response).why_wrong}`);
        console.log( `Below is explanations: ${displayExplanation(response).tip}`);


        return displayExplanation(response);

    } catch (err) {
        console.error("Error fetching AI explanation:", err);
        throw err;
    }

}