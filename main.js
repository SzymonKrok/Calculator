// Declares all necessary variables

const numbers = document.querySelectorAll('.number'),
      operators = document.querySelectorAll('.operator'),
      deleteBtn = document.querySelector('.delete'),
      backBtn = document.querySelector('.back'),
      equalsBtn = document.querySelector('.equals'),
      previousOperation = document.querySelector('.previous-operation'),
      currentOperation = document.querySelector('.current-operation');

let firstNumber = '',
    secondNumber = '',
    operation = undefined;

// Empty comment

const updateResult = () => {
    currentOperation.innerText = firstNumber;
    if(operation !== undefined){
        previousOperation.innerText = secondNumber + operation;
    } else {
        previousOperation.innerText = '';
    }


}

const addNumber = (number) => {
    if(number === '.'){
        if(firstNumber.includes('.')){
            return;
        }
    }
    firstNumber = firstNumber.toString() + number.toString();
}

const chooseOperator = (operator) => {
    if(currentOperation.innerText === ''){
        if(operator !== "-") {
            return;
        }
    }

    if(previousOperation.innerText !== ''){
        equals();
    }

    operation = operator;
    secondNumber = firstNumber;
    firstNumber = '';


}

const equals = () => {
    // console.log(operator);

    let calculations;

    if(!previousOperation || !currentOperation){
        return;
    }

    const first = parseFloat(firstNumber);
    const second = parseFloat(secondNumber);

    switch (operation){
        case '+':
            calculations = second + first;
            break;
        case '-':
            calculations = second - first;
            break;
        case '*':
            calculations = second * first;
            break;
        case '/':
            calculations = second / first;
            break;
        default:
            return;
    }

    firstNumber = calculations;
    secondNumber = '';
    operation = undefined;

}

const removeNumber = () => {
    firstNumber = firstNumber.toString().slice(0, -1);
    updateResult();
}

const deleteAll = () => {
    firstNumber = '';
    secondNumber = '';
    updateResult();
}

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        addNumber(number.innerText);
        updateResult();
    })
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        chooseOperator(operator.innerText);
        updateResult();
    })
})

backBtn.addEventListener('click', removeNumber);

deleteBtn.addEventListener('click', deleteAll);

equalsBtn.addEventListener('click', () => {
    equals();
    updateResult();
} )


document.querySelector('body').addEventListener("click", (number) => {
    console.log("Number: " + number.innerText)
    console.log("First: " + firstNumber);
    console.log("Second: " + secondNumber);
    console.log("Operator: " + operation);
})