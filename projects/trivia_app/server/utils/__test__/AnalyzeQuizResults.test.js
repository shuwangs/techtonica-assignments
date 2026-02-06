import { analyzeQuizResults } from '../AnalyzeQuizResults.js';
import { beforeEach, describe, expect, test } from '@jest/globals';

describe('analyze results function', () => {
    let mockOriginalQuestions;
    // this mockData beforEach runs before each test in this describe block
    beforeEach(() => {
        // setup any necessary data or state before each test
        mockOriginalQuestions = [{
            question: 'What is 2 + 2?',
            correct_answer: '4',
        },
        {
            question: 'What is the capital of France?',
            correct_answer: 'Paris',
        },
        {
            question: 'What color is the sky?',
            correct_answer: 'Blue',
        }];
    })

    test('analyzes quiz results correctly', () => {
        const userAnswers = [{
            question: 'What is 2 + 2?',
            userSelected: '4',
        },
        {
            question: 'What is the capital of France?',
            userSelected: 'Paris',
        },
        {
            question: 'What color is the sky?',
            userSelected: 'Blue',
        }];

        const result = analyzeQuizResults(userAnswers, mockOriginalQuestions);
        console.log(result);
        expect(result.correctCount).toBe(3);
        expect(result.details).toEqual([
            {
                question: 'What is 2 + 2?',
                userSelected: '4',
                correctAnswer: '4',
                isCorrect: true,
            },
            {
                question: 'What is the capital of France?',
                userSelected: 'Paris',
                correctAnswer: 'Paris',
                isCorrect: true,
            },
            {
                question: 'What color is the sky?',
                userSelected: 'Blue',
                correctAnswer: 'Blue',
                isCorrect: true,
            },
        ]);

        expect(result.details).toHaveLength(3);
    });

})