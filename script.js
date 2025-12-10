let currentNumber = "";
let previousNumber = "";
let operation = null;

const display = document.getElementById("display");
const historyList = document.getElementById("historyList");

// 🔥 Carregar histórico salvo ao iniciar
window.onload = () => {
  const savedHistory = JSON.parse(localStorage.getItem("calc_history")) || [];
  savedHistory.forEach((item) => addToHistory(item, false)); // false = não salvar novamente
};

document.querySelectorAll("[data-num]").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentNumber += btn.getAttribute("data-num");
    updateDisplay(currentNumber);
  });
});

document.querySelectorAll("[data-op]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentNumber === "") return;
    previousNumber = currentNumber;
    currentNumber = "";
    operation = btn.getAttribute("data-op");
  });
});

document.getElementById("equals").addEventListener("click", () => {
  if (previousNumber === "" || currentNumber === "" || !operation) return;

  let num1 = parseFloat(previousNumber);
  let num2 = parseFloat(currentNumber);
  let result;

  switch (operation) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num2 !== 0 ? num1 / num2 : "Erro";
      break;
  }

  updateDisplay(result);

  const historyText = `${num1} ${operation} ${num2} = ${result}`;
  addToHistory(historyText, true); // true = salvar no localStorage

  previousNumber = result.toString();
  currentNumber = "";
  operation = null;
});

document.getElementById("clear").addEventListener("click", () => {
  currentNumber = "";
  previousNumber = "";
  operation = null;
  updateDisplay(0);
});

function updateDisplay(value) {
  display.textContent = value;
}

function addToHistory(text, save = true) {
  const li = document.createElement("li");
  li.textContent = text;

  li.addEventListener("click", () => {
    const result = text.split("=").pop().trim();
    currentNumber = result;
    updateDisplay(result);
  });

  historyList.prepend(li);

  // 🔥 Salvar no localStorage
  if (save) {
    const current = JSON.parse(localStorage.getItem("calc_history")) || [];
    current.unshift(text);
    localStorage.setItem("calc_history", JSON.stringify(current));
  }
}
