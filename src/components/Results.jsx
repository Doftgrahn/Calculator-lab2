import React from "react";

const Results = ({value, calculateValue, result}) => {
    return (
        <div className="result__wrapper">
            <p className="calculateValue">{calculateValue}</p>
            <p className="result">{!result ? "no results yet" : result}</p>
        </div>
    );
};

export default Results;

//<p>{!value ? "write something" : value}</p>
