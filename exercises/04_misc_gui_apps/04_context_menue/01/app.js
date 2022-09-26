var todoItems = [
  { id: 1, title: "Homework" },
  { id: 2, title: "Shopping" },
  { id: 3, title: "Calling Mom" },
  { id: 4, title: "Coffee with John" },
];

var App = {
  todos: todoItems,
  todosTemplate: Handlebars.compile($("#todos_template").html()),
  confirmTemplate: Handlebars.compile($("#confirm_template").html()),
  selectTemplate: Handlebars.compile($("#select_template").html()),
  $todos: $("ul#todos"),
  $confirm: $(".confirm_prompt"),

  renderTodos: function () {
    this.$todos.html(this.todosTemplate({ todos: this.todos }));
  },

  handleDeleteClick: function (e) {
    e.preventDefault();
    var todoId = Number($(e.target).closest("li").attr("data-id"));
    this.showPrompt(todoId);
  },

  handleConfirmYes: function (e) {
    var todoId = Number(
      $(e.target).closest(".confirm_wrapper").attr("data-id")
    );
    e.preventDefault();
    this.removeTodo(todoId);
  },

  removeTodo: function (id) {
    this.todos = this.todos.filter(function (todo) {
      return todo.id !== id;
    });

    this.hidePrompt();
    this.renderTodos();
  },

  showPrompt: function (todoId) {
    this.$confirm.html(this.confirmTemplate({ id: todoId }));
    this.$confirm.add(".overlay").show();
    this.bindPromptEvents();
  },

  bindPromptEvents: function () {
    this.$confirm.find(".confirm_no").one("click", this.hidePrompt.bind(this));
    this.$confirm
      .find(".confirm_yes")
      .one("click", this.handleConfirmYes.bind(this));
  },

  hidePrompt: function () {
    this.$confirm.add(".overlay").hide();
    this.$confirm.html("");
    $('.custom-options').toggle('open');

  },

  showOptions: function (todo, todoId) {
    todo.append(this.selectTemplate({ id: todoId }));
    todo.find(".custom-options").toggleClass("open");
    this.bindOptionsEvents();
  },

  bindOptionsEvents: function () {
    this.$todos.on("click", ".custom-option", this.handleDeleteClick.bind(this));
  },

  handleRightClick: function (event) {
    event.preventDefault();
    let $todoSelected = $(event.target);
    let todoId = Number($todoSelected.attr("data-id"));
    this.showOptions($todoSelected, todoId);
  },

  init: function () {
    this.renderTodos();
    this.showPrompt.bind(this);
    this.$todos.on("click", "li .remove", this.handleDeleteClick.bind(this));
    this.$todos.on("contextmenu", this.handleRightClick.bind(this));
    $(".overlay").on("click", this.hidePrompt.bind(this));
  },
};

App.init();
