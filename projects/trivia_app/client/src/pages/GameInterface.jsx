import React from 'react';


const GameInterface = ({gameQuestions}) =>{
    if (!gameQuestions || gameQuestions.length === 0) {
        return <p>Loading questions...</p>;
    }
    console.log(gameQuestions);


    return (
        <div className='gameInterface-container'>
            <div className='page-header'>
                <h1>Let's do the quize!</h1>
            </div>
        </div>


    )
}

export default GameInterface;