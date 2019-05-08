import React from "react";

const Results = ({value, displayValue}) => {
    return (
        <div className="result__wrapper">
            <p className="calculateValue">{!displayValue ? 'write stuff' : displayValue}</p>
            <p>{!value ? 'no value' : value}</p>
        </div>
    );
};

export default Results;

//<p>{!value ? "write something" : value}</p>
