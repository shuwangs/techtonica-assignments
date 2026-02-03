import React from 'react';


const GameSetup = ({onSubmit}) =>{
    const amount = useRef(null);
    const category = useRef(null);
    const difficulty = useRef(null);
    const type = useRef(null);

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(amount.current.value);
        console.log(category.current.value);
        console.log(difficulty.current.value);
        console.log(type.current.value);
    }

    return(
        <div>
            <form >
                 <label>How many question you would like to try?
                    <input type='number' ref={amount} />

                 </label>

                 <label> Categories you are intested?
                    <select>
                        <option>Placeholder1</option>
                        <option>Placeholder2</option>
                    </select>
                 </label>
                 <label> Difficulty Level
                    <select ref={difficulty}>
                        <option>Simple</option>
                        <option>Medium</option>
                        <option>Difficult</option>

                    </select>
                 </label>

                <div>
                    <p>Type of question?</p>
                    <label> <input type="radio" ref={type} />ALL</label>
                    <label><input type="radio" ref={type} /> Single choice</label>
                    <label><input type="radio" ref={type} />Multiple choice</label>
                </div>
            

            </form>

        </div>

    ) 
}

export default GameSetup;