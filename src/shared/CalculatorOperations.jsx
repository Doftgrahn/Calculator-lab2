const CalculatorOperations = {
    "+": (previousValue, nextValue) => +previousValue + +nextValue,
    "-": (previousValue, nextValue) => previousValue - nextValue,
    "/": (previousValue, nextValue) => previousValue / nextValue,
    "*": (previousValue, nextValue) => previousValue * nextValue,
    "=": (previousValue, nextValue) => nextValue
};

export default CalculatorOperations;
