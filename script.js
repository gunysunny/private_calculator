// 1) 모든 버튼 요소 선택
const buttons = document.querySelectorAll('.button');

//디스플레이 요소와 숫자 버튼들 선택
const displayEl = document.querySelector('.display');
const expressionEl = document.querySelector('.expression');
const resultEl     = document.querySelector('.result');
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
//클릭시 콘솔로 클릭한 버튼의 값이 출력됨


// 2) 숫자 버튼 이벤트
numberButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const digit = btn.textContent;        // 눌린 버튼 값
    if (currentInput === '0') {
        currentInput = digit;               // 0일 때는 그대로 대체
    } else {
        currentInput += digit;              // 그 외에는 뒤에 붙이기
    }
      resultEl.textContent = currentInput;  // 아래줄 결과에 표시
      // 식 부분은 그대로 두거나, 필요에 따라 초기화/유지
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
    expressionEl.textContent = '';
    resultEl.textContent     = '0';
    currentInput = '0';
    operator = null;
    firstOperand = secondOperand = null;
});

// 5) 연산자 버튼 처리 (+, -, *, /)
operEl.forEach(btn => {
    btn.addEventListener('click', () => {
        if (firstOperand == null) {
            firstOperand = parseFloat(currentInput);
        } else if (operator) {
            secondOperand = parseFloat(currentInput);
            firstOperand = operate(firstOperand, secondOperand, operator);
        }
        operator = btn.textContent;
        currentInput = '0';
        // 식 표시: 예) "12 +"
            expressionEl.textContent = `${firstOperand} ${operator}`;
            resultEl.textContent     = firstOperand;
        });
    });

// 6) equals 버튼 처리
equalsButton.addEventListener('click', () => {
    if (operator && firstOperand != null) {
        secondOperand = parseFloat(currentInput);
        const calcResult = operate(firstOperand, secondOperand, operator);

      // 최종 식과 결과 출력
        expressionEl.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
        resultEl.textContent     = calcResult;

      // 상태 초기화
        operator = null;
        firstOperand = calcResult;
        currentInput = '0';
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
