const App = {
  alterText: function (event) {
    let action = event.target.dataset.command;
    console.log(action);
    let url;
    if (action === "createLink") {
      document.getSelection().toString();
      url = prompt("Attach a URL here:");
    }

    document.execCommand(action, null, url);
    document.getElementById("text").focus();
  },

  init: function () {
    document.querySelectorAll("#buttons button").forEach((button) => {
      button.addEventListener("click", this.alterText.bind(this));
    });
  },
};

App.init();

