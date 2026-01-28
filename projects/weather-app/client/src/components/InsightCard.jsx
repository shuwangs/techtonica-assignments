import React from'react';
import './InsightCard.css';

const InsightCard = ({title, status, suggestion}) =>{

    return (
        <div className='insight-card'>
            <h3>{title}</h3>
            <p>{status}</p>
            <p>{suggestion}</p>
        </div>
    )
}
export default InsightCard;