import React, {Component} from "react";
import "./styles/App.scss";

import Input from "./components/Input";
import LogicButtons from "./components/LogicButtons";

import Results from "./components/Results";

import FormerResults from "./components/FormerResults";

const CalculatorOperations = {
    "+": (previousValue, nextValue) => previousValue + +nextValue,
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
            {oper: "+", event: event => this.performOperation("+", event)},
            {oper: "-", event: event => this.performOperation("-", event)},
            {oper: "=", event: event => this.performOperation("=", event)},
            {oper: "/", event: event => this.performOperation("/", event)},
            {oper: "*", event: event => this.performOperation("*", event)},
            {oper: "CE", event: () => this.resetValue()},
            {oper: "M+", event: () => this.mPlus()},
            {oper: "M-", event: () => this.mMinus()}
        ],
        savedResults: null,
        formerResults: [],
        finalResult: null
    };

    componentDidMount() {
        this.numberInput.current.select();
    }

    resetValue = () => {
        this.setState({
            value: null,
            displayvalue: "0",
            operator: null,
            waitingForOperand: false,
            formerResults: []
        });
        this.numberInput.current.select();
    };

    changeInputValue = inputValue => {
        const {waitingForOperand, displayvalue} = this.state;
        if (waitingForOperand) {
            this.setState({
                displayvalue: inputValue,
                waitingForOperand: false
            });
        } else {
            this.setState({
                displayvalue: displayvalue === "0" ? +inputValue : +inputValue
            });
        }
    };

    performOperation = (nextOperator, event) => {
        const {displayvalue, value, operator, formerResults} = this.state;

        if (!value) {
            this.setState({value: displayvalue});
        } else if (operator) {
            const newValue = CalculatorOperations[operator](
                value,
                displayvalue
            );
            if (nextOperator === "=") {
                this.setState({finalResult: newValue});
            }
            const history =
                formerResults.length === 0
                    ? [nextOperator, newValue]
                    : [...formerResults, nextOperator, newValue];

            this.setState({
                value: newValue,
                displayvalue: "",
                formerResults: history
            });
        }

        this.setState({
            waitingForOperand: true,
            operator: nextOperator
        });
        this.numberInput.current.select();
    };

    mPlus = () => {
        this.setState({savedResults: this.state.value});
        this.numberInput.current.select();
    };

    mMinus = () => {
        this.setState({displayvalue: this.state.savedResults});
        this.numberInput.current.select();
    };

    render() {
        return (
            <section className="Calculator">
                <h1>Calculator</h1>
                <Input
                    numberInputRef={this.numberInput}
                    displayvalue={this.state.displayvalue}
                    changeInput={this.changeInputValue}
                    value={this.state.value}
                    chosenOperator={this.state.operator}
                />
                <LogicButtons operator={this.state.operator} operators={this.state.operators} />
                <Results
                    value={this.state.value}
                    savedResults={this.state.savedResults}
                    finalResult={this.state.finalResult}
                />
                <FormerResults formerResults={this.state.formerResults} />
            </section>
        );
    }
}

export default Calculator;
