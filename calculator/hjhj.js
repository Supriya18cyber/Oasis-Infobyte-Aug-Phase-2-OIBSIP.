let runningTotal = 0;
let buffer = "0";
let previousOperator = null; // Initialize previousOperator to null

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null; // Reset previousOperator
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperator(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal.toString(); // Convert runningTotal to a string
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case 'x':
        case '/':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperator(intBuffer);
    }

    previousOperator = symbol;
    buffer = '0';
}

function flushOperator(intBuffer) {
    switch (previousOperator) {
        case '+':
            runningTotal += intBuffer;
            break;
        case '-':
            runningTotal -= intBuffer;
            break;
        case 'x':
            runningTotal *= intBuffer;
            break;
        case '/':
            if (intBuffer === 0) {
                screen.innerText = "Error"; // Handle division by zero
                return;
            }
            runningTotal /= intBuffer;
            break;
    }
}

function handleNumber(numberString) {
    if (buffer === "0" && numberString !== "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    const buttons = document.querySelectorAll('.cal-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttonClick(button.innerText);
        });
    });
}

init();
