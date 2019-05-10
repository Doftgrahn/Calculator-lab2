import React from "react";

const FormerResults = ({formerResults}) => (
    <>
        <ul>
            {formerResults.length === 0
                ? <span>no History of anything</span>
                : formerResults.map((former, i) => (
                      <li key={`key:${i}`}>{former}</li>
                  ))}
        </ul>
    </>
);

export default FormerResults;
