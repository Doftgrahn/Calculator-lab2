import React from "react";

const Results = ({value, savedResults, formerResults}) => {
    return (
        <div className="result__wrapper">
            <p className="calculateValue">
                {value === null ? "write stuff" : value}
            </p>

            <>{!savedResults ? <span className="memory">you have nothing saved</span> : <span className="memory active">You have saved: {savedResults}</span>} </>


<p>{formerResults.map((former,i) => <span key={i}>{former}</span>)}</p>

        </div>
    );
};

export default Results;


//<p>{!formerResults ? 'nothing' : formerResults.map((e,i) => <span key={i}>{e}</span>)}</p>
