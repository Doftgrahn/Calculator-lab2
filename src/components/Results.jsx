import React from "react";

const Results = ({value, savedResults}) => {
    return (
        <div className="result__wrapper">
            <p className="calculateValue">
                {value === null ? "write stuff" : value}
            </p>
            <p>You have saved: {savedResults}</p>
            <>{!savedResults ? <span>you have nothing saved</span> : <span>You have saved: {savedResults}</span>} </>
        </div>
    );
};

export default Results;
