import React from "react";

const Results = ({value, savedResults, finalResult}) => {
    return (
        <div className="result__wrapper">
            {/*<p className="calculateValue">
                {value === null ? "write stuff" : value}
            </p>*/}

            <>{!savedResults ? <span className="memory">you have nothing saved</span> : <span className="memory active">You have saved: {savedResults}</span>} </>
            <p>{!finalResult ? 'nothing to see here': finalResult}</p>
        </div>
    );
};

export default Results;


//<p>{!formerResults ? 'nothing' : formerResults.map((e,i) => <span key={i}>{e}</span>)}</p>
