
const TakeAction = {
  clearEvent: function () {
    Calculator.updateCurrentNum("0");
  },
  clear: function () {
    Calculator.resetCalculator();
  },
  decimal: function () {
    Calculator.addDecimal();
  },
  negate: function () {
    Calculator.negateNum();
  },
};

Calculator = {
  calculations: [],
  $currentNum: $(".current_num"),
  $calculation: $(".calculation"),
  currentOperation: null,
  tempNum: false,

  addDecimal: function () {
    if (!/\./g.test(this.currentNum)) {
      this.updateCurrentNum(this.currentNum + ".");
    }
  },

  negateNum: function () {
    if (this.currentNum > 0) {
      this.updateCurrentNum(-this.currentNum);
    }
  },

  operate: function (operation, operand1, operand2) {
    if (typeof Operators[operation] === "function") {
      return Operators[operation](operand1, operand2);
    }
  },

  replaceCurrentNum: function (num) {
    this.$currentNum.text(num);
    this.currentNum = num;
    this.tempNum = true;
  },

  resetCalculator: function (num) {
    (this.calculations = []), this.$calculation.text("");
    this.currentNum = num || 0;
    this.$currentNum.text(this.currentNum);
    (this.currentOperation = null), (this.tempNum = false);
  },

  updateCurrentNum: function (num) {
    this.currentNum = num;
    this.$currentNum.text(this.currentNum);
    this.tempNum = true;
  },

  manipulateCurrentNum: function (num) {
    if (this.$action) {
      TakeAction[this.$action](this.$key);
    } else {
      num = this.currentNum + num;
      this.updateCurrentNum(num);
    }
  },

  actOnCurrentNum: function () {
    if (this.currentNum === "0") {
      this.replaceCurrentNum(this.$key.text());
    } else if (this.tempNum) {
      this.manipulateCurrentNum(this.$key.text());
    } else {
      this.replaceCurrentNum(this.$key.text());
    }
  },

  addToCalculations: function (string) {
    this.calculations.push(string);
    //console.log(this.calculation);
  },

  outputCalculation: function () {
    this.$calculation.text(this.calculations.join(" "));
  },

  handleOperation: function (operation) {
    this.addToCalculations(this.currentNum);
    this.currentOperation = operation;
    this.addToCalculations(this.currentOperation);
    this.outputCalculation();
    this.tempNum = false;
  },

  makeCalculation: function () {
    this.calculations.push(this.currentNum);
    let calcString = this.calculations.join(" ");
    let regex = /X/g;
    calcString = calcString.replace(regex, "*");
    console.log(calcString);
    let result = eval(calcString);

    this.resetCalculator(result);
    this.tempNum = false;
  },

  handleInput: function (event) {
    this.$key = $(event.target);
    this.$action = this.$key.data("action");

    if (!this.$action) {
      this.actOnCurrentNum();
    } else if (this.$key.hasClass("key--operator")) {
      this.handleOperation(this.$key.text());
    } else if (this.$key.hasClass("key--equal")) {
      this.makeCalculation();
    } else if (this.$action) {
      this.manipulateCurrentNum();
    }
  },

  bindHandler($objects, event, selector, handler) {
    $objects.on(event, selector, handler.bind(this));
  },

  init: function () {
    this.bindHandler($("#buttons"), "click", "button", this.handleInput);
    this.currentNum = this.$currentNum.text();
  },
};

Calculator.init();
