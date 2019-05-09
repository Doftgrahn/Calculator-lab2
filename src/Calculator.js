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
            {oper: "M+"},
            {oper: "M-"}
        ]
    };

    componentDidMount() {
        this.numberInput.current.focus();
    }
    resetValue = () => {
        this.setState({value: 0, displayvalue: "0"});
        this.numberInput.current.focus();
    };

    changeInputValue = event => {
        let {waitingForOperand, displayvalue} = this.state;
        if (waitingForOperand) {
            this.setState({
                displayvalue: String(event.target.value),
                waitingForOperand: false
            });
        }
        this.setState({
            displayvalue:
                displayvalue === "0"
                    ? event.target.value
                    : (displayvalue = +event.target.value)
        });
    };

    performOperation = nextOperator => {
        const {displayvalue, value, operator} = this.state;
        const inputValue = parseFloat(displayvalue);

        if (value === null) {
            this.setState({value: inputValue});
        } else if (operator) {
            const currentValue = value || 0;

            const newValue = CalculatorOperations[operator](
                currentValue,
                inputValue
            );

            this.setState({
                value: newValue
            });
        }
        this.setState(
            {
                waitingForOperand: true,
                operator: nextOperator
            },
            () => console.log(operator)
        );
        this.numberInput.current.focus();
    };

    render() {
        const {value, operators, displayvalue} = this.state;
        return (
            <section className="Calculator">
                <h1>Calculator</h1>
                <Input
                    numberInputRef={this.numberInput}
                    displayvalue={displayvalue}
                    changeInput={this.changeInputValue}
                />
                <LogicButtons operators={operators} />
                <Results value={value} />
            </section>
        );
    }
}

export default Calculator;

//this.setState({value: ""});
//this.numberInput.current.focus();
//let listsTogether = [...calculateValue, value];
