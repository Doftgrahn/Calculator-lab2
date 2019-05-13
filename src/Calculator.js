import React, {Component} from "react";
import "./styles/App.scss";

import Title from "./components/Title";
import Input from "./components/Input";
import LogicButtons from "./components/LogicButtons";
import Results from "./components/Results";
import FormerResults from "./components/FormerResults";

/*this stuff does the calculations. yäy*/
import CalculatorOperations from "./shared/CalculatorOperations";

class Calculator extends Component {
    numberInput = React.createRef();

    state = {
        value: null,
        displayvalue: "0",
        operator: null,
        waitingForOperand: false,
        savedResults: null,
        formerResults: [],
        finalResult: null,
        operators: [
            {oper: "+", event: () => this.performOperation("+")},
            {oper: "-", event: () => this.performOperation("-")},
            {oper: "=", event: () => this.performOperation("=")},
            {oper: "/", event: () => this.performOperation("/")},
            {oper: "*", event: () => this.performOperation("*")},
            {oper: "C", event: () => this.resetValue("C")},
            {oper: "M+", event: () => this.mPlus("M+")},
            {oper: "M-", event: () => this.mMinus("M-")}
        ]
    };

    componentDidMount() {
        this.numberInput.current.focus();
        this.numberInput.current.select();
    }

    resetValue = () => {
        this.setState({
            operators: this.state.operators.map(
                p => (p.oper === "CA" ? {...p, oper: "C"} : p)
            )
        });

        this.setState({
            value: null,
            displayvalue: 0,
            operator: null,
            waitingForOperand: false,
            formerResults: []
        });
        this.numberInput.current.focus();
        this.numberInput.current.select();
    };

    changeInputValue = inputValue => {
        const {waitingForOperand, displayvalue} = this.state;
        //change reset to 'C' or 'CA'

        if (displayvalue > 0 || displayvalue === "0" || inputValue === 0) {
            this.setState({
                operators: this.state.operators.map(
                    p => (p.oper === "C" ? {...p, oper: "CA"} : p)
                )
            });
        } else {
            this.setState({
                operators: this.state.operators.map(
                    p => (p.oper === "CA" ? {...p, oper: "C"} : p)
                )
            });
        }

        //change input
        if (waitingForOperand) {
            this.setState({
                displayvalue: inputValue,
                waitingForOperand: false
            });
        } else {
            this.setState({
                displayvalue: displayvalue === "0" ? +inputValue : +inputValue,
                waitingForOperand: true
            });
        }
    };

    performOperation = nextOperator => {
        const {displayvalue, value, operator, formerResults} = this.state;

        if (!value) {
            this.setState({value: displayvalue});
        } else if (operator) {
            const newValue = CalculatorOperations[operator](
                value,
                displayvalue
            );
            if (nextOperator === "=") {
                this.setState({
                    operators: this.state.operators.map(
                        p => (p.oper === "CA" ? {...p, oper: "C"} : p)
                    )
                });

                this.setState({
                    finalResult: newValue,
                    formerResults: [...formerResults, newValue]
                });
            }

            const history =
                formerResults.length === 0
                    ? [nextOperator, newValue]
                    : [...formerResults, newValue];

            this.setState({
                value: newValue,
                displayvalue: newValue,
                formerResults: history
            });
        }
        this.setState({
            waitingForOperand: true,
            operator: nextOperator
        });

        this.numberInput.current.focus();
        this.numberInput.current.select();
    };

    mPlus = () => {
        if (!this.state.value) {
            this.setState({savedResults: this.state.displayvalue});
        } else {
            this.setState({savedResults: this.state.value});
        }
        this.numberInput.current.focus();
        this.numberInput.current.select();
    };

    mMinus = () => {
        if (!this.state.savedResults) {
            throw new Error("Shut up and dance with me! lalalalalalalal");
        } else {
            this.setState({displayvalue: this.state.savedResults});
        }
        this.numberInput.current.focus();
        this.numberInput.current.select();
    };

    render() {
        return (
            <section className="Calculator">
                <div className={this.state.displayvalue === "0" ? "shaky" : ""}>
                    <Title displayvalue={this.state.displayvalue} />
                    <Input
                        numberInputRef={this.numberInput}
                        displayvalue={this.state.displayvalue}
                        changeInput={this.changeInputValue}
                        value={this.state.value}
                    />
                    <LogicButtons
                        operator={this.state.operator}
                        operators={this.state.operators}
                    />
                    <Results
                        value={this.state.value}
                        savedResults={this.state.savedResults}
                        finalResult={this.state.finalResult}
                    />
                    <FormerResults formerResults={this.state.formerResults} />
                </div>
            </section>
        );
    }
}

export default Calculator;
