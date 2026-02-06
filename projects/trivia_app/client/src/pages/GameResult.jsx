import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate} from 'react-router-dom';

const GameResult = () =>{
    const navigate = useNavigate();
    const { state } = useLocation();
    const [tableData, setTableData] = useState(state?.details ||[]);

    console.log(state.details);

    const handleDelete = (indexToDelete) => {
        const newData = tableData.filter((_, index) => index !== indexToDelete);
        setTableData(newData);
    }

    useEffect(() => {
        if (state.details){
            setTableData(state.details);}
        }, [state]
    );




    return (

        <div className='result-page'>
            <div className='result-header'>
                <div className='new-game-btn'>
                    <button
                        onClick={()=>
                            navigate('/')
                        }>New Game</button>
                </div>
                <h1>{state.correctCount} / {state.totalCount} is Correct</h1>
            </div>

            <div className='table-display'>
                <table>
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Your Answer</th>
                            <th>Correct Answer</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tableData.map((row, idx) =>{
                            return (
                            <tr 
                                key={idx} className={row.isCorrect ? 'correct' : 'incorrect'} >
                                <td>{row.question}</td>
                                <td>{row.userSelected}</td>
                                <td>{row.correctAnswer}</td>
                                <td>
                                    <button 
                                        onClick={() => handleDelete(idx)}>
                                        ❌
                                    </button>
                                </td>

                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>

        </div>
        
    )
}

export default GameResult;