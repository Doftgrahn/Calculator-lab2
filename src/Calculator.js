import React, {Component} from "react";
import "./styles/App.scss";
import Input from "./components/Input";
import LogicButtons from "./components/LogicButtons";

import Results from "./components/Results";

class Calculator extends Component {
    numberInput = React.createRef();
    state = {
        value: "",
        calculateValue: [],
        result: "",
        operators: [
            {oper: "+", event: event => this.plus(event)},
            {oper: "-"},
            {oper: "=", event: () => this.equalTo()},
            {oper: "CE", event: () => this.resetValue()},
            {oper: "M+"},
            {oper: "M-"}
        ]
    };

    componentDidMount() {
        this.numberInput.current.focus();
    }

    changeInputValue = event => {
        this.setState({value: event.target.value});
    };

    resetValue = () => {
        this.setState({value: ""});
        this.setState({calculateValue: []});
        this.numberInput.current.focus();
    };

    plus = () => {
        let {value, calculateValue} = this.state;
        let listsTogether = [...calculateValue,value];
        this.setState({calculateValue: listsTogether});

        this.numberInput.current.focus();
        this.setState({value: ""});
    };

    equalTo = () => {
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
