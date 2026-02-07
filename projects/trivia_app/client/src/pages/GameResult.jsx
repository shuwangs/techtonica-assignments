import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate} from 'react-router-dom';
import { deleteRow, fetchExplanation } from '../utils/resultsPageHelper';
const GameResult = () =>{
    const navigate = useNavigate();
    const { state } = useLocation();
    const [tableData, setTableData] = useState(state?.details ||[]);
    const [loadingId, setLoadingId] = useState(null);

    console.log(state.details);

    const onDeleteClick = (idx) => {
        const newData = deleteRow(tableData, idx);
        setTableData(newData);
    };

    const handleGetExplanation = async (idx, row ) =>{
        if (row.explanation) return;
        setLoadingId(idx);
        try {
            const aiRes = await fetchExplanation(row);

            setTableData(prevData => {
                const newData = [...prevData];
                newData[idx] = {...newData[idx], explanation: aiRes};
                return newData;
            })
        } catch(err) {
            console.error("AI explanation is not responding");
        }finally{
            setLoadingId(null);
        }

    }

    useEffect(() => {
        if (state.details){
            setTableData(state.details);}
        }, [state]
    );

    useEffect(() => {
        console.log(tableData);}, [tableData]
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
                                <React.Fragment key={idx}>
                                    <tr 
                                        key={idx} className={row.isCorrect ? 'correct' : 'incorrect'} >
                                        <td>{row.question}</td>
                                        <td>{row.userSelected}</td>
                                        <td>{row.correctAnswer}</td>
                                        <td>
                                            {!row.isCorrect && (
                                                <button 
                                                    onClick= {()=> handleGetExplanation(idx, row)}>
                                                        💡
                                                </button>
                                            )}
                                            </td>
                                        <td>
                                        <button 
                                            onClick={() => onDeleteClick(idx)}>
                                            ❌
                                        </button>
                                    </td>

                                </tr>

                                <tr className={`collapse-row ${row.explanation ?'expanded' : '' }`}>
                                    <td>
                                        <div className="collapse-container">
                                            {row.explanation && (
                                                <div className="ai-content-card">
                                                <p><strong>Concept:</strong> {row.explanation.concept}</p>
                                                <p><strong>Why Correct:</strong> {row.explanation.why_correct}</p>
                                                <p><strong>Why Wrong:</strong> {row.explanation.why_wrong}</p>
                                                <p className="tip-box"><strong>Pro Tip:</strong> {row.explanation.tip}</p>
                                            </div>
                                        )}</div>
                                    </td>
                                </tr>

                            </React.Fragment> )    
                        })}
                    </tbody>
                </table>
            </div>

        </div>
        
    )
}

export default GameResult;