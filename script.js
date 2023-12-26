// Requirements 
// menampilkan angka & operator, menghitung, menghapus

// Steps (mudah - sulit)
// 1. Angka bisa tampil di layar
// 1.1 Button angka bisa diakses javascript
// 1.2 Javascript bisa menampilkan angka ke layar
// 2. Operator bisa tampil di layar
// 2.1 Button operator bisa diakses javascript
// 2.2 Javascript bisa menampilkan operator ke layar
// 3. Fungsi menghapus isi layar
// 3.1 Button hapus bisa diakses javascript
// 3.2 Javascript bisa menghapus isi layar
// 4. Fungsi operator jalan jika ada angka, operator, dan angka
// 4.1 Klik + -> add angka1 & angka2, dst
let shouldResetSecond = false;
let firstNumber, secondNumber, resultNumber;
let currentOpr = null;
let dividedByZero = false;
const operators = ['+', '-', '×', '÷', '^'];

let firstScreen = document.getElementById("firstDisplay");
let secondScreen = document.getElementById("secDisplay");
let numberButtons = document.querySelectorAll("[data-number]");
let operatorButtons = document.querySelectorAll("[data-operator]");
let acButton = document.getElementById("acBtn");
let delButton = document.getElementById("delBtn");
let pointButton = document.getElementById("pointBtn");
let equalButton = document.getElementById("equalBtn");

// karena ada banyak number & operator
numberButtons.forEach((button) =>
    button.addEventListener("click", () => appendNumber(button.value))
);
operatorButtons.forEach((button) =>
    button.addEventListener("click", () => {
        appendOperator(button.value)
    })
);

pointButton.addEventListener("click", appendPoint);
acButton.addEventListener("click", allClearScreen);
delButton.addEventListener("click", delNumber);
equalButton.addEventListener("click", result);
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) return; // Do nothing if the event was already processed
    if (event.key >= 0 && event.key <= 9)
        appendNumber(event.key);
    if (event.key === '.') appendPoint();
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/' || event.key === '^')
        appendOperator(event.key);
    if (event.key === 'Enter' || event.key === '=') result();
    if (event.key === 'Backspace') delNumber();
    if (event.key === 'Escape') allClearScreen();
});


// shouldResetSecond bisa true jika udah ada 7+ trs input 9
// secondScreen direset, jadi cuma nampilin 9
function appendNumber(number) {
    if (secondScreen.textContent === '0' || shouldResetSecond === true)
        resetSecondScreen();
    secondScreen.textContent += number;
}

function appendOperator(operator) {
    secondNumber = secondScreen.textContent;
    if (currentOpr === '÷' && secondNumber === '0') {
        secondScreen.style.fontSize = "30px";
        secondScreen.textContent = 'Cannot / by zero';
        dividedByZero = true;
        return;
    }
    if (currentOpr !== null) {
        resultNumber = calculate(firstNumber, currentOpr, secondNumber);
        console.log(resultNumber)
        firstScreen.textContent = `${resultNumber} ${operator}`;
        secondScreen.textContent = resultNumber;
    }
    // awal + trs ganti -
    firstNumber = secondScreen.textContent;
    currentOpr = operator;
    firstScreen.textContent = `${firstNumber} ${currentOpr}`;
    // krn di layar pertama udh simpan 7 + & layar kedua simpan 7, kalo mau nambah 9 kan 
    // secondScreen nya harus direset trs nampilin angka 9 aja bkn 79 
    shouldResetSecond = true;
}

function appendPoint() {
    if (secondScreen.textContent.includes('.')) return;
    secondScreen.textContent += '.';
}

function allClearScreen() {
    secondScreen.style.fontSize = "45px";
    firstScreen.textContent = '';
    secondScreen.textContent = '0';
    firstNumber = '';
    secondNumber = '';
    currentOpr = null;
}

function delNumber() {
    if (dividedByZero) {
        dividedByZero = false;
        allClearScreen();
    }
    // slice(0, -1) berarti ambil arr dari index 0 sampe paling belakang-1 (tampilin semua isi kecuali paling belakang)
    secondScreen.textContent = secondScreen.textContent.slice(0, -1);
    if (secondScreen.textContent.length === 0) secondScreen.textContent = '0';
}

function resetSecondScreen() {
    secondScreen.textContent = '';
    shouldResetSecond = false;
}

// trigger =
function result() {
    // kalau ga ada input operator & cuma =
    if (currentOpr === null) return;
    secondNumber = secondScreen.textContent;
    if (currentOpr === '÷' && secondNumber === '0') {
        firstScreen.textContent = `${firstNumber} ${currentOpr}`;
        secondScreen.style.fontSize = "30px";
        secondScreen.textContent = 'Cannot / by zero';
        dividedByZero = true;
        return;
    }
    resultNumber = calculate(firstNumber, currentOpr, secondNumber);
    secondScreen.textContent = resultNumber;
    firstScreen.textContent = `${firstNumber} ${currentOpr} ${secondNumber} = `;
    currentOpr = null; // krn udh selesai
}

function calculate(x, operator, y) {
    x = Number(x);
    y = Number(y);
    console.log(x, y);

    switch (operator) {
        case '+':
            return x + y;
        case '-':
            return x - y;
        case '×':
            return x * y;
        case '÷':
            return x / y;
        case '^':
            return Math.pow(x, y);
    }
}

// function appendOperator(operator) {
//     // let currFirstScreen = firstScreen.textContent;
//     // let lastChar = currFirstScreen.charAt(currFirstScreen.length-1);
//     // if (operators.includes(lastChar)) {
//     //     return;
//     // }
//     // if (operators.includes(operator)) {
//     //     firstScreen.textContent += operator;
//     // }
//     // awal + trs ganti -
//     firstNumber = secondScreen.textContent;
//     currentOpr = operator;
//     firstScreen.textContent = `${firstNumber} ${currentOpr}`;
//     // krn di layar pertama udh simpan 7 + , kalo mau nambah 9 kan 
//     // secondScreen nya harus kosong trs nampilin angka 9 aja bkn 79 
//     shouldResetSecond = true;
// }