document.addEventListener("DOMContentLoaded", function() {
  const Calculate = {
    "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
    "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
    "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
    "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  };

  let form = document.querySelector("form");
  const getValueOf = (selector) => form.querySelector(selector).value;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let firstNumber = +getValueOf("#first-number");
    let secondNumber = +getValueOf("#second-number");
    let operator = getValueOf("#operator");

    let calculate = Calculate[operator];
    let answer = calculate(firstNumber, secondNumber);
    document.querySelector("#result").textContent = String(answer);
  });
});