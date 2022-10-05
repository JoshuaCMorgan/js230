var App = {
  $form: $("form"),
  $input: $("input"),

  handleValueAbsence: function ($control) {
    var labelText = $("label[for=" + $control.attr("id") + "]").text();
    var $errorMessage = $control.next(".error_message");
    var errorMessage = labelText + " is a required field.";
    $control.addClass("invalid_field");
    $errorMessage.text(errorMessage);
  },

  handlePatternMismatch: function ($control) {
    var labelText = $("label[for=" + $control.attr("id") + "]").text();
    var $errorMessage = $control.next(".error_message");
    var errorMessage = "Please Enter a valid " + labelText + ".";
    $control.addClass("invalid_field");
    $errorMessage.text(errorMessage);
    if ($control.attr("id") === "password") {
      $errorMessage.text("Password must be at least 10 characters long.");
    }
  },

  validateControl: function ($control) {
    // uses constraint validation API element.validity
    if ($control[0].validity.valueMissing) {
      this.handleValueAbsence($control);
      return false;
    } else if ($control[0].validity.patternMismatch) {
      this.handlePatternMismatch($control);
      return false;
    }
    return true;
  },

  handleFormSubmit: function (event) {
    event.preventDefault();

    if ($("form")[0].checkValidity()) {
      $(".form_errors").text("");
    } else {
      $(".form_errors").text(
        "Form cannot be submitted until errors are corrected."
      );
      this.validateFormInputs();
      return false;
    }
  },

  validateFormInputs: function () {
    var self = this;
    this.$input.each(function () {
      self.validateControl($(this));
    });
  },

  handleBlur: function (e) {
    var $control = $(e.target);
    console.log($control);
    console.log($("form")[0]);

    if ($("form")[0].checkValidity()) {
      $(".form_errors").text("");
    }
    this.validateControl($control);
  },

  handleFocus: function (e) {
    var $control = $(e.target);

    $control.next(".error_message").text("");
    $control.removeClass("invalid_field");
  },

  init: function () {
    this.$input.on("blur", this.handleBlur.bind(this));
    this.$input.on("focus", this.handleFocus.bind(this));
    this.$form.on("submit", this.handleFormSubmit.bind(this));
  },
};

App.init();
