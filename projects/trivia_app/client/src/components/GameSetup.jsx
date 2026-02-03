import React from 'react';


const GameSetup = () =>{

    return(
        <div>
            <form >
                 <label>How many question you would like to try?
                    <input type='number'  />

                 </label>

                 <label> Categories you are intested?
                    <select>
                        <option>Placeholder1</option>
                        <option>Placeholder2</option>
                    </select>
                 </label>

                <div>
                    <p>Type of question?</p>
                    <label> <input type="radio"/>ALL</label>
                    <label><input type="radio"  /> Single choice</label>
                    <label><input type="radio" />Multiple choice</label>
                </div>
            

            </form>

        </div>

    ) 
}

export default GameSetup;