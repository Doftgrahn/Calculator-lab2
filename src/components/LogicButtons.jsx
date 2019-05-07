import React from "react";

const LogicButtons = ({operators}) => {
    const oper = operators.map((op, i) => (
        <button key={i} onClick={op.event}>
            {op.oper}
        </button>
    ));

    return <div className="operator_wrapper">{oper}</div>;
};

export default LogicButtons;
