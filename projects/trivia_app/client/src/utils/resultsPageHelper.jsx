import React from "react";
import axios from 'axios';

const displayExplanation = (data) => {
    return {
        concept: data.concept || "General Knowledge",
        whyCorrect: data.why_correct || "The answer is factually verified.",
        whyWrong: data.why_wrong, 
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
        });

        const finalData = displayExplanation(response.data);
        console.log("Formatted Data:", finalData);
        return finalData;

    } catch (err) {
        console.error("Error fetching AI explanation:", err);
        throw err;
    }

}

export const getCloseExplanation = (currentData, idx) =>{
        const newData = [...currentData];
        newData[idx] = { ...newData[idx], explanation: null };  
        return newData;
}

export const decodeHtmlEntities = (text) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}