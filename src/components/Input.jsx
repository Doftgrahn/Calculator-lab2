import React from "react";

const Input = ({value, changeInput, numberInputRef}) => {
    return (
        <div className="input__wrapper">
            <label htmlFor="inputValue">Funky Calculator</label>
            <input
                autoComplete="off"
                ref={numberInputRef}
                type="text"
                id="inputValue"
                placeholder="Calculate"
                value={value}
                onChange={changeInput}
            />
        </div>
    );
};

export default Input;
