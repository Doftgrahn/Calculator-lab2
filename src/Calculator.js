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
            {oper: "+", event: () => this.performOperation("+")},
            {oper: "-", event: () => this.performOperation("-")},
            {oper: "=", event: () => this.performOperation("=")},
            {oper: "/", event: () => this.performOperation("/")},
            {oper: "*", event: () => this.performOperation("*")},
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
            savedResults: null,
            formerResults: []
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
        const {displayvalue, value, operator, formerResults} = this.state;

        if (value === null && operator === null) {
            this.setState({value: displayvalue});
        } else if (operator) {
            const currentValue = value || 0;
            const newValue = CalculatorOperations[operator](
                currentValue,
                displayvalue
            );
            if (nextOperator === "=") {
                this.setState({finalResult: newValue});
            }

            this.setState(
                {
                    value: newValue,
                    displayvalue: newValue,
                    formerResults:
                        formerResults.length === 0
                            ? [nextOperator, newValue]
                            : [
                                  nextOperator,
                                  ...formerResults,
                                  nextOperator,
                                  newValue
                              ]
                },
                () => console.log(formerResults)
            );
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
        const {
            value,
            operators,
            displayvalue,
            savedResults,
            formerResults,
            finalResult
        } = this.state;
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
                <Results
                    value={value}
                    savedResults={savedResults}
                    finalResult={finalResult}
                />
                <FormerResults formerResults={formerResults} />
            </section>
        );
    }
}

export default Calculator;
