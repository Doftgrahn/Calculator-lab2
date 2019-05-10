import React, {Component} from "react";
import "./styles/App.scss";
import Input from "./components/Input";
import LogicButtons from "./components/LogicButtons";

import Results from "./components/Results";

const CalculatorOperations = {
    "+": (previousValue, nextValue) => previousValue + nextValue,
    "-": (previousValue, nextValue) => previousValue - nextValue,
    "/": (previousValue, nextValue) => previousValue / nextValue,
    "*": (previousValue, nextValue) => previousValue * nextValue,
    "=": (previousValue, nextValue) => nextValue
};

class Calculator extends Component {
    numberInput = React.createRef();
    state = {
        value: null,
        displayvalue: "0",
        operator: null,
        waitingForOperand: false,
        operators: [
            {oper: "+", event: () => this.performOperation("+")},
            {oper: "-", event: () => this.performOperation("-")},
            {oper: "=", event: () => this.performOperation("=")},
            {oper: "/", event: () => this.performOperation("/")},
            {oper: "*", event: () => this.performOperation("*")},
            {oper: "CE", event: () => this.resetValue()},
            {oper: "M+", event: () => this.mPlus()},
            {oper: "M-", event: () => this.mMinus()}
        ],
        savedResults: null
    };

    componentDidMount() {
        this.numberInput.current.focus();
    }

    resetValue = () => {
        this.setState({
            value: null,
            displayvalue: "0",
            operator: null,
            waitingForOperand: false
        });
        this.numberInput.current.select();
    };

    changeInputValue = event => {
        let {waitingForOperand, displayvalue} = this.state;
        if (waitingForOperand) {
            this.setState({
                displayvalue: event.target.value,
                waitingForOperand: false
            });
        } else {
            this.setState({
                displayvalue:
                    displayvalue === "0"
                        ? +event.target.value
                        : +event.target.value
            });
        }
    };

    performOperation = nextOperator => {
        const {displayvalue, value, operator} = this.state;
        const inputValue = displayvalue;

        if (value === null) {
            this.setState({value: inputValue});
        } else if (operator) {
            const currentValue = value || 0;

            const newValue = CalculatorOperations[operator](
                currentValue,
                inputValue
            );

            this.setState({
                value: newValue,
                displayvalue: newValue
            });
        }

        this.setState({
            waitingForOperand: true,
            operator: nextOperator
        });
        this.numberInput.current.select();
    };

    mPlus = () => {
        let {value} = this.state;
        this.setState({savedResults: value});
        this.numberInput.current.select();
    };

    mMinus = () => {
        let {savedResults} = this.state;
        this.setState({displayvalue: savedResults});
        this.numberInput.current.select();
    };

    render() {
        const {value, operators, displayvalue, savedResults} = this.state;
        return (
            <section className="Calculator">
                <h1>Calculator</h1>
                <Input
                    numberInputRef={this.numberInput}
                    displayvalue={displayvalue}
                    changeInput={this.changeInputValue}
                    value={value}
                />
                <LogicButtons operators={operators} />
                <Results value={value} savedResults={savedResults} />
            </section>
        );
    }
}

export default Calculator;
