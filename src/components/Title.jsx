import React from "react";

const Title = ({displayvalue}) => {

    return (
        <div
            className={
                displayvalue === 0 && displayvalue === "0" ? "shaky" : ""
            }
        >
            <h1>Calculator</h1>
            <p>Your friendly neighborhood Calculator</p>
        </div>
    );
};

export default Title;
