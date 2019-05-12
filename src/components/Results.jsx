import React from "react";

const Results = ({value, savedResults, finalResult}) => {
    return (
        <div className="result__wrapper">
            <>{!savedResults ? <span className="memory">You have saved:</span> : <span className="memory active">You have saved: {savedResults}</span>} </>
            <p>{!finalResult ? 'result:': 'result: ' + finalResult}</p>
        </div>
    );
};

export default Results;


//<p>{!formerResults ? 'nothing' : formerResults.map((e,i) => <span key={i}>{e}</span>)}</p>
