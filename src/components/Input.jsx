import React from "react";

const Input = ({displayvalue, changeInput, numberInputRef}) => {
    return (
        <div className="input__wrapper">
            <label htmlFor="inputValue">Funky Calculator</label>
            <input
                className="inputField"
                autoComplete="off"
                ref={numberInputRef}
                type="text"
                id="inputValue"
                placeholder="Calculate"
                displayvalue={displayvalue}
                onChange={changeInput}
            />
        </div>
    );
};

export default Input;
