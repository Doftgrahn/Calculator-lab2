const CalculatorOperations = {
    "+": (previousValue, nextValue) => previousValue + +nextValue,
    "-": (previousValue, nextValue) => previousValue - nextValue,
    "/": (previousValue, nextValue) => previousValue / nextValue,
    "*": (previousValue, nextValue) => previousValue * nextValue,
    "%": (previousValue, nextValue) => previousValue % nextValue,
    "π": (previousValue, nextValue) => previousValue + nextValue * 3.14,
    "=": (previousValue, nextValue) => nextValue
};

export default CalculatorOperations;
