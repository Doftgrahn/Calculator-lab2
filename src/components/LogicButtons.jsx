import React from "react";

const LogicButtons = ({operators, operator}) => {

    const oper = operators.map((op, i) =>
        <button className={op.oper === operator ? "btnActive" : ""} key={i} onClick={op.event}>
        {op.oper}
        </button>
    );

    return <div className="operator_wrapper">{oper}</div>;
};

export default LogicButtons;
