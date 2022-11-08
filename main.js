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
    previousOperation.innerText = secondNumber;
    currentOperation.innerText = firstNumber
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
    operation = operator.toString();
    if(operation !== undefined){
        secondNumber = firstNumber + operation;
        firstNumber = '';
        updateResult()
    }
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
        console.log("Number: " + number.innerText)
        console.log("First: " + firstNumber);
        console.log("Second: " + secondNumber);
        console.log("Operator: " + operation);
    })
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        chooseOperator(operator.innerText);
    })
})

backBtn.addEventListener('click', removeNumber);

deleteBtn.addEventListener('click', deleteAll)