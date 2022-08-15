const divRed = document.querySelector('#red');
const divBlue = document.querySelector('#blue');
const divOrange = document.querySelector('#orange');
const divGreen = document.querySelector('#green');

const tracker = (() => {
  const events = [];
  return {
    list() {
      return events.slice();
    },
    elements() {
      this.list().map(({target}) => target);
    },
    add(event) {
      events.push(event);
    },
    clear() {
      events.length = 0;
      return events.length;
    }
  };
})();

function track(callback) {
  function isEventTracked(events, event) {
    return events.includes(event);
  }

  return function(event) {
    if (!isEventTracked(tracker.list(), event)) {
      tracker.add(event);
    }

    callback(event);
  };
 
}

divRed.addEventListener('click', track(event => {
  
  document.body.style.background = 'red';
}));

divBlue.addEventListener('click', track(event => {
  event.stopPropagation();
  document.body.style.background = 'blue';
}));

divOrange.addEventListener('click', track(event => {
  event.stopPropagation();
  document.body.style.background = 'orange';
}));

divGreen.addEventListener('click', track(event => {
  event.stopPropagation();
  document.body.style.background = 'green';
}));
/*
<html>
  <head>
    <title>Tests</title>
    <meta charset="utf-8">
    <style>
      #red, #blue, #green, #orange {
        cursor: pointer;
        color: white;
        padding: 10px;
        margin: 10px;
      }
    
      #red {
        width: 400px;
        height: 400px;
        background: red;
      }

      #blue {
        width: 200px;
        height: 200px;
        background: blue;
      }

      #orange {
        width: 100px;
        height: 100px;
        background: orange;
      }

      #green {
        width: 50px;
        height: 50px;
        background: green;
      }
    </style>
  </head>
  <body>
    <div id="red">Red
      <div id="blue">Blue</div>
      <div id="orange">Orange
        <div id="green">Green</div>
      </div>
    </div>
    <script src="test.js"></script>
  </body>
</html>
*/