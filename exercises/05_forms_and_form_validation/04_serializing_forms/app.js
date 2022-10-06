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
    var labelText = $("label[for=" + $control.attr("name") + "]").text();
    var $errorMessage = $control.siblings(".error_message");
    var errorMessage = "Please Enter a valid " + labelText + ".";

    $control.addClass("invalid_field");
    $errorMessage.text(errorMessage);
    console.log($errorMessage);
    if ($control.attr("name") === "password") {
      $errorMessage.text("Password must be at least 10 characters long.");
    }
  },

  validateControl: function ($control) {
    // uses constraint validation API element.validity, an object with methods
    if ($control[0].validity.valueMissing) {
      this.handleValueAbsence($control);
      return false;
    } else if ($control[0].validity.patternMismatch) {
      this.handlePatternMismatch($control);
      return false;
    }
    return true;
  },

  serializeForm: function() {
    var attributes = {};

    var self = this;
    this.$form.find('input').each(function() {
      var $control = $(this);
      var name     = $control.attr('name');
      var value    = $control.val();

      attributes[name] = attributes[name] || '';
      attributes[name] += value;
    });

    return this.hashToParams(attributes);
  },

  hashToParams: function(attrs) {
    var attrsArray = [];

    Object.keys(attrs).forEach(function(key) {
      attrsArray.push(encodeURIComponent(key) + '=' + encodeURIComponent(attrs[key]));
    });
    return attrsArray.join('&');
  },

  handleFormSubmit: function (event) {
    event.preventDefault();
    console.log("hello");
    if ($("form")[0].checkValidity()) {
      $(".form_errors").text("");
      this.serializeForm();
      $('.serialized-form').append('<p>' + this.serializeForm() + '</p>');
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

  blockNonAlpha: function (event) {
    if (/[^a-zA-Z\s]/.test(event.key)) {
      event.preventDefault();
    }
  },

  blockNonNumeric: function (event) {
    if (/[^0-9]/.test(event.key)) {
      event.preventDefault();
    }
  },

  handleTabForward: function (event) {
    let $input = $(event.target);
    let valLength = $input.val().length;

    if (valLength === $input[0].maxLength) {
      $input.nextAll("input")[0].focus();
    }
  },

  bindHandler: function ($objects, event, selector, handler) {
    $objects.on(event, selector, handler.bind(this));
  },

  init: function () {
    this.bindHandler(this.$input, "blur", "", this.handleBlur);
    this.bindHandler(this.$input, "focus", "", this.handleFocus);
    this.bindHandler(this.$form, "submit", "", this.handleFormSubmit);
    this.bindHandler(
      $("#first_name, #last_name"),
      "keypress",
      "",
      this.blockNonAlpha
    );
    this.bindHandler(
      $("#phone, #cd1, #cd2, #cd3, #cd4"),
      "keypress",
      "",
      this.blockNonNumeric
    );
    this.bindHandler($("#cd1, #cd2, #cd3"), "input", "", this.handleTabForward);
  },
};

App.init();
