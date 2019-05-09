import React from "react";

const Results = ({value}) => {
    return (
        <div className="result__wrapper">
            <p className="calculateValue">
                {value === null ? "write stuff" : value}
            </p>
        </div>
    );
};

export default Results;
