import React,{useEffect, useRef, useState} from 'react';


const GameSetup = ({onSubmit}) =>{
    const amount = useRef(null);
    const categoryRef = useRef(null);
    const difficulty = useRef(null);
    const type = useRef(null);
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
        console.log(amount.current.value);
        console.log(categoryRef.current.value);
        console.log(difficulty.current.value);
        console.log(type.current.value);
    }

    return(
        <div>
            <form
             onSubmit={handleSubmit}>
                 <label>How many question you would like to try?
                    <input type='number' ref={amount} />

                 </label>

                 <label> Categories you are interested?
                    <select ref={categoryRef}>
                        <option value="">Any category</option>
                        {categories.map(elem => {
                            return ( <option value={elem.id}> {elem.name} </option>)
                        })}
                    </select>
                 </label>
                 <label> Difficulty Level
                    <select ref={difficulty}>
                        <option value="">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                 </label>

                <div>
                    <p>Type of question?</p>
                    <label> <input type="radio" ref={type} value="" />Any Type</label>
                    <label><input type="radio" ref={type} value="single" /> True / False</label>
                    <label><input type="radio" ref={type} value="multiple" />Multiple Choice</label>
                </div>
            
                <button type='submit'>Start Quiz</button>
            </form>

        </div>

    ) 
}

export default GameSetup;