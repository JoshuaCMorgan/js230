var App = {
  $toggleButton: $('.toggle'),
  $resetButton: $('.reset'),
  isOn: false,
  centiSecs: 0,
  secs: 0,
  mins: 0,
  hours: 0,

  startStop: function() {
    if (this.isOn) {
      this.stop();
    } else {
      this.start();
    }
  },

  start: function() {
    this.interval = setInterval(this.addTime.bind(this), 10);
    this.$toggleButton.text('Stop');
    this.isOn = true;
  },

  stop: function() {
    clearInterval(this.interval);
    this.$toggleButton.text('Start');
    this.isOn = false;
  },

  addTime: function() {
    this.centiSecs++;
    if (this.centiSecs === 100) {
      this.centiSecs = 0;
      this.secs++;

      if (this.secs === 60) {
        this.secs = 0;
        this.mins++;

        if (this.mins === 60) {
          this.mins = 0;
          this.hours++;
        }
      }
    }

    this.displayTime();
  },

  reset: function() {
    this.isOn && this.stop();

    this.centiSecs = 0;
    this.secs = 0;
    this.mins = 0;
    this.hours = 0;

    this.displayTime();
  },

  displayTime: function() {
    $('.centisecs').text(this.centiSecs < 10 ? '0' + this.centiSecs : this.centiSecs);
    $('.secs').text(this.secs < 10 ? '0' + this.secs : this.secs);
    $('.mins').text(this.mins < 10 ? '0' + this.mins : this.mins);
    $('.hours').text(this.hours < 10 ? '0' + this.hours : this.hours);
  },

  init: function() {
    this.$toggleButton.on('click', this.startStop.bind(this));
    this.$resetButton.on('click', this.reset.bind(this));
  }
};

App.init();