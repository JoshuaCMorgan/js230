/*
  create settimeout
    inside we need to retrieve the target element image.
    using image, we need to get next figcaption element
    fade in the caption
    give position of absolute.
*/

$(function () {
  const App = {
    startTimer: function (e) {
      this.timer = setTimeout(function() {
        // for better code clarity
        this.showToolTip(e);
        // in order for 'showToolTip' to be apart
        // of App object, we need to bind its
        // execution context to it.  Otherwise,
        // it is bound to 'startTimer'
      }.bind(this), 700);
    },

    showToolTip: function (e) {
      $figcap = $(e.target).next("figcaption").fadeIn(300);
      $figcap.css("position", "absolute");
    },

    handleMouseLeave: function(e) {
      if (this.timer) {
        clearTimeout(this.timer);
      };
      $('figcaption').fadeOut(300);
    },

    init: function () {
      $("#amazing_animals").on("mouseenter", "img", this.startTimer.bind(this));
      $("#amazing_animals").on("mouseleave", "img", this.handleMouseLeave.bind(this));
    },
  };
  App.init();
});
