import React, {Component} from "react";
import "./styles/App.scss";
import Input from "./components/Input";
import LogicButtons from "./components/LogicButtons";

import Results from "./components/Results";

const CalculatorOperations = {
    "+": (previousValue, nextValue) => previousValue + nextValue,
    "-": (previousValue, nextValue) => previousValue - nextValue,
    "=": (previousValue, nextValue) => nextValue
};

class Calculator extends Component {
    numberInput = React.createRef();
    state = {
        value: 0,
        displayValue: "0",
        operator: null,
        waitingForOperand: false,
        operators: [
            {oper: "+", event: () => this.performOperation("+")},
            {oper: "-", event: () => this.performOperation("-")},
            {oper: "=", event: () => this.performOperation("=")},
            {oper: "CE", event: () => this.resetValue()},
            {oper: "M+"},
            {oper: "M-"}
        ]
    };

    componentDidMount() {
        this.numberInput.current.focus();
    }

    changeInputValue = event => {
        this.setState({value: +event.target.value}, () =>
            console.log(this.state.value)
        );
    };

    resetValue = () => {
        this.setState({
            value: "",
            calculateValue: [],
            result: ""
        });

        this.numberInput.current.focus();
    };

    clearAll = () => {
        this.setState({displayValue: "0"});
    };

    performOperation = nextOperator => {
        let {value, displayValue, operator} = this.state;
        const inputValue = parseFloat(displayValue);
        if (value === 0) {
            this.setState({value: inputValue});
        } else if (operator) {
            const currentValue = value || 0;
            const newValue = CalculatorOperations[operator](
                currentValue,
                inputValue
            );
            console.log("hej", newValue);
            this.setState({
                value: newValue,
                displayValue: String(newValue)
            });
        }
        this.setState({
            waitingForOperand: true,
            operator: nextOperator
        });
        this.numberInput.current.focus();
    };

    equalTo = event => {
        console.log(event.target);
        let {calculateValue} = this.state;
        let calculateResult = calculateValue.join("");
        this.setState({result: calculateResult}, () =>
            console.log("results is this:", this.state.result)
        );
        this.numberInput.current.focus();
    };

    render() {
        let {value, operators, calculateValue, result} = this.state;
        return (
            <main className="Calculator">
                <h1>Calculator</h1>
                <Input
                    numberInputRef={this.numberInput}
                    value={value}
                    changeInput={this.changeInputValue}
                />
                <LogicButtons operators={operators} />
                <Results
                    value={value}
                    calculateValue={calculateValue}
                    result={result}
                />
            </main>
        );
    }
}

export default Calculator;

//this.setState({value: ""});
//this.numberInput.current.focus();
//let listsTogether = [...calculateValue, value];
