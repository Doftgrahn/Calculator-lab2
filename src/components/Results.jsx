import React from 'react';



const Results = ({ value, calculateValue, result }) => {
    return (<div className="result__wrapper">
    <p>{!value ? 'write something': value}</p>
    <p className="calculateValue">{ calculateValue.length === 0 ? <span>Nothing to see here</span> : calculateValue.map((e,i) => <span key={i}>{e}</span>)}</p>
    <p className="result">{!result ? 'no results yet': result}</p>

    </div>)
}


export default Results;
