import React,{useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const GameSetup = ({onStart}) =>{
    const navigate = useNavigate();
    const amountRef = useRef('10');
    const categoryRef = useRef(null);
    const difficultyRef = useRef(null);
    const typeRef = useRef(null);
    const [categories, setCategories] = useState([])

    useEffect(() =>{
        console.log("fetching categories...");
        fetch("/api/categories")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setCategories(data.trivia_categories);
        })
        .catch((err) => {
            console.error("Error fetching categories:", err);
        });
    }
    ,[]);
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(amountRef.current.value);
        console.log(categoryRef.current.value);
        console.log(difficultyRef.current.value);
        console.log(typeRef.current.value);
        const userRequest = {
            amount: amountRef.current.value,
            category: categoryRef.current.value,
            difficulty: difficultyRef.current.value,
            type: typeRef.current.value
        }

        onStart(userRequest);

        navigate('/game');
    }

    return(
        <div className='setup-form'>
            <form
             onSubmit={handleSubmit}>
                 <label>Question Amount
                    <input type='number' 
                    ref={amountRef}
                    defaultValue={10}
                    min={1}
                    max={30}
                     />

                 </label>

                 <label> Categories
                    <select ref={categoryRef}>
                        <option value="">Any category</option>
                        {categories.map(elem => {
                            return ( <option key={elem.id} value={elem.id}> {elem.name} </option>)
                        })}
                    </select>
                 </label>
                 <label> Difficulty Level
                    <select ref={difficultyRef}>
                        <option value="">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                 </label>

                <label>
                    Question type:
                    <select ref={typeRef} defaultValue="">
                        <option value="">Any Type</option>
                        <option value="boolean">True / False</option>
                        <option value="multiple">Multiple Choice</option>

                    </select>
                </label>
            
                <button type='submit'>Start Quiz</button>
            </form>

        </div>

    ) 
}

export default GameSetup;