// Declares all necessary variables

const numbers = document.querySelectorAll(".number"),
    operators = document.querySelectorAll(".operator"),
    deleteBtn = document.querySelector(".delete"),
    backBtn = document.querySelector(".back"),
    equalsBtn = document.querySelector(".equals"),
    previousOperation = document.querySelector(".previous-operation"),
    currentOperation = document.querySelector(".current-operation");

let firstNumber = "",
    secondNumber = "",
    operation = undefined;

// Update result on our calculator
const updateResult = () => {
    currentOperation.innerText = firstNumber;
    if (operation !== undefined) {
        previousOperation.innerText = secondNumber + operation;
    } else {
        previousOperation.innerText = "";
    }
};

// Add number and check dot in number
const addNumber = (number) => {
    if (number === ".") {
        if (firstNumber.includes(".")) {
            return;
        }
    }
    firstNumber = firstNumber.toString() + number.toString();
};

// Possibility to select a negative number
const chooseOperator = (operator) => {
    if (currentOperation.innerText === "") {
        if (operator !== "-") {
            return;
        }
    }

    if (previousOperation.innerText !== "") {
        equals();
    }

    operation = operator;
    secondNumber = firstNumber;
    firstNumber = "";
};

// New number after get result
let equalsClicked = false;

equalsBtn.addEventListener("click", function () {
    equalsClicked = false;

    numbers.forEach((number) => {
        console.log(number.innerHTML);
        number.addEventListener("click", function () {
            if (!equalsClicked) {
                currentOperation.innerHTML = number.innerHTML;
                firstNumber = number.innerHTML;
                equalsClicked = true;
            }
        });
    });
});

// Main calculator functionality
const equals = () => {
    let calculations;

    console.log(previousOperation);
    console.log(currentOperation);

    if (!previousOperation || !currentOperation) {
        return;
    }

    const first = parseFloat(firstNumber);
    const second = parseFloat(secondNumber);

    switch (operation) {
        case "+":
            calculations = second + first;
            break;
        case "-":
            calculations = second - first;
            break;
        case "*":
            calculations = second * first;
            break;
        case "/":
            calculations = second / first;
            break;
        default:
            return;
    }

    firstNumber = calculations;
    secondNumber = "";
    operation = undefined;
};

// Operation of the AC and DEL buttons
const removeNumber = () => {
    firstNumber = firstNumber.toString().slice(0, -1);
    updateResult();
};

const deleteAll = () => {
    firstNumber = "";
    secondNumber = "";
    operation = "";
    updateResult();
};

// Operate click number and operators
numbers.forEach((number) => {
    number.addEventListener("click", () => {
        addNumber(number.innerText);
        updateResult();
    });
});

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        chooseOperator(operator.innerText);
        updateResult();
    });
});

// Setting listener for a click

backBtn.addEventListener("click", removeNumber);

deleteBtn.addEventListener("click", deleteAll);

equalsBtn.addEventListener("click", () => {
    equals();
    updateResult();
});
