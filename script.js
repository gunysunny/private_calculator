// 1) 모든 버튼 요소 선택
const buttons = document.querySelectorAll('.button');

// 디스플레이 요소와 숫자 버튼들 선택
const displayEl = document.querySelector('.display');
const expressionEl = document.querySelector('.expression');
const resultEl = document.querySelector('.result');
const numberButtons = document.querySelectorAll('.number');

// 소수점 및 초기화버튼
const decimalButton = document.querySelector('.decimal');
const clearButton = document.querySelector('.clear');

// 사칙연산
const operEl = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');

let operator = null;
let firstOperand = null;
let secondOperand = null;
let currentInput = '0';

// 💥 Ripple 효과 적용
buttons.forEach((button) => {
    button.addEventListener('click', function (e) {
        const oldRipple = this.querySelector('.ripple-effect');
        if (oldRipple) oldRipple.remove();

        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        const maxDim = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${maxDim * 2}px`;

        this.appendChild(ripple);

    ripple.addEventListener('animationend', () => ripple.remove());
    });
});

// 💡 숫자 포맷 (3자리마다 콤마)
function formatNumberWithCommas(numStr) {
    if (numStr === null || numStr === undefined || isNaN(numStr)) return '0';
    const [intPart, decimalPart] = String(numStr).split(".");
    const formattedInt = Number(intPart).toLocaleString();
    return decimalPart ? `${formattedInt}.${decimalPart}` : formattedInt;
}

// 2) 숫자 버튼 입력 처리
numberButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const digit = btn.textContent;
        if (currentInput === '0') {
        currentInput = digit;
        } else {
        currentInput += digit;
        }
    resultEl.textContent = formatNumberWithCommas(currentInput);
    });
});

// 3) 소수점 입력
decimalButton.addEventListener('click', () => {
    if (!currentInput.includes('.')) {
    currentInput += '.';
    resultEl.textContent = formatNumberWithCommas(currentInput);
    }
});

// 4) C 버튼 (초기화)
clearButton.addEventListener('click', () => {
    expressionEl.textContent = '';
    resultEl.textContent = '0';
    currentInput = '0';
    operator = null;
    firstOperand = secondOperand = null;
});

// 5) 연산자 버튼 처리
operEl.forEach(btn => {
    btn.addEventListener('click', () => {
        if (firstOperand == null) {
        firstOperand = parseFloat(currentInput.replace(/,/g, ''));
        } else if (operator) {
        secondOperand = parseFloat(currentInput.replace(/,/g, ''));
        firstOperand = operate(firstOperand, secondOperand, operator);
        }
    operator = btn.textContent;
    currentInput = '0';

    expressionEl.textContent = `${formatNumberWithCommas(firstOperand)} ${operator}`;
    resultEl.textContent = formatNumberWithCommas(firstOperand);
    });
});

// 6) = 버튼 처리
equalsButton.addEventListener('click', () => {
    if (operator && firstOperand != null) {
    secondOperand = parseFloat(currentInput.replace(/,/g, ''));
    const calcResult = operate(firstOperand, secondOperand, operator);

    expressionEl.textContent = `${formatNumberWithCommas(firstOperand)} ${operator} ${formatNumberWithCommas(secondOperand)} =`;
    resultEl.textContent = formatNumberWithCommas(calcResult);

    // 상태 초기화
    operator = null;
    firstOperand = calcResult;
    currentInput = '0';
    }
});

// 7) 실제 계산 함수
function operate(a, b, operator) {
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/':
        if (b === 0) {
            alert("0으로 나눌 수 없습니다.");
            return 0;
        }
        return a / b;
        default: return b;
    }
}