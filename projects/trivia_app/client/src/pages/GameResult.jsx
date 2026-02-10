import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate} from 'react-router-dom';
import { deleteRow, fetchExplanation, getCloseExplanation, decodeHtmlEntities } from '../utils/resultsPageHelper';
const GameResult = () =>{
    const navigate = useNavigate();
    const { state } = useLocation();
    const [tableData, setTableData] = useState(state?.details ||[]);
    const [loadingId, setLoadingId] = useState(null);
    const [nickName, setNickName] = useState(null);

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
    const handleCloseClick = (idx) => {
        const updatedData = getCloseExplanation(tableData, idx);
        setTableData(updatedData);
    };  

    useEffect(() => {
        if (localStorage.getItem('userName')) {
            setNickName(localStorage.getItem('userName'))
        }
        if (state.details){
            setTableData(state.details);}
        }, [state]
    );

    return (

        <div className='result-page'>
            {nickName &&<h2>Nice try, {nickName}! Here are your results </h2>}

            <div className='result-header'>
                <div className='new-game-btn'>
                    <button
                        onClick={()=>
                            navigate('/')
                        }>New Game</button>
                </div>
                <h2>{state.correctCount} / {state.totalCount} is Correct</h2>
            </div>

            <div className='table-display'>
                <table>
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Your Answer</th>
                            <th>Correct Answer</th>
                            <th>Explain</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tableData.map((row, idx) =>{
                            return (
                                <React.Fragment key={idx}>
                                    <tr 
                                        key={idx} className={row.isCorrect ? 'correct' : 'incorrect'} >
                                        <td>{decodeHtmlEntities(row.question)}</td>
                                        <td>{decodeHtmlEntities(row.userSelected)}</td>
                                        <td>{decodeHtmlEntities(row.correctAnswer)}</td>
                                        <td>
                                            {!row.isCorrect && (
                                                <div 
                                                    className='explanation-icon'
                                                    onClick= {()=> handleGetExplanation(idx, row)}
                                                    >
                                                        💡
                                                </div>
                                            )}
                                            </td>
                                        {/* <td>
                                            <button 
                                                onClick={() => onDeleteClick(idx)}>
                                                ❌
                                            </button>
                                        </td> */}

                                    </tr>

                                    <tr className={`collapse-row ${row.explanation ? 'expanded' : '' }`}>
                                        <td colSpan="4">
                                            <div className="collapse-container">
                                                {row.explanation && (
                                                    <div className="ai-content-card"> 
                                                        <div>
                                                            <p><strong>Why Correct:</strong> {(row.explanation.whyCorrect)}</p>
                                                            <p><strong>Why Wrong:</strong> {row.explanation.whyWrong}</p>
                                                            <p className="tip-box"><strong>Pro Tip:</strong> {row.explanation.tip}</p>
                                                        </div>
                                                        <div 
                                                            className='close-icon'
                                                            onClick={() => handleCloseClick(idx)
                                                            }
                                                            >
                                                                ✖️
                                                        </div>
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