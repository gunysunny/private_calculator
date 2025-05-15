// 1) 모든 버튼 요소 선택
const buttons = document.querySelectorAll('.button');

//디스플레이 요소와 숫자 버튼들 선택
const displayEl = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');

// 소수점 및 초기화버튼
const decimalButton = document.querySelector('.decimal');
const clearButton   = document.querySelector('.clear');

// 사칙연산
const operEl = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');  // 추가된 equals 버튼

let operator = null;
let firstOperand = null;
let secondOperand = null;
let currentInput = '0';

// 2) 각 버튼에 click 이벤트 리스너 붙이기
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        console.log(button.textContent);
    });
});

numberButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const digit = btn.textContent;
        if (currentInput === '0') {
            currentInput = digit;
        } else {
            currentInput += digit;
        }
        displayEl.textContent = currentInput;
    });
});

// 3) 소수점 버튼 처리
decimalButton.addEventListener('click', () => {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        displayEl.textContent = currentInput;
    }
});

// 4) C 버튼 처리 (초기화)
clearButton.addEventListener('click', () => {
    currentInput = '0';
    operator = null;
    firstOperand = null;
    secondOperand = null;
    displayEl.textContent = currentInput;
});

// 5) 연산자 버튼 처리 (+, -, *, /)
operEl.forEach((btn) => {
    btn.addEventListener('click', () => {
        if(firstOperand == null) {
            firstOperand = parseFloat(currentInput);
        } else if (operator) {
            secondOperand = parseFloat(currentInput);
            firstOperand = operate(firstOperand, secondOperand, operator);
            displayEl.textContent = firstOperand;
        }
        operator = btn.textContent;
        currentInput = '0';
    });
});

// 6) equals 버튼 처리
equalsButton.addEventListener('click', () => {
    if (operator && firstOperand != null) {
        secondOperand = parseFloat(currentInput);
        firstOperand = operate(firstOperand, secondOperand, operator);
        displayEl.textContent = firstOperand;
        operator = null; // 연산 후 operator 초기화
        currentInput = '0';  // 결과 정리
    }
});

// 7) 연산 수행 함수
function operate(a, b, operator) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if(b === 0) {
                alert("오류");
                return 0;
            }
            return a / b;
        default:
            return b;
    }
}
