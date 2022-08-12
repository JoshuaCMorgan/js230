/*
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8">
    <title>Bold Element + Custom</title>
  </head>
  <style>
    .highlight {
      background-color: yellow;
    }
  </style>
  <body>
    <section>Hello World</section>
    <p>Greetings!</p>
  </body>
  <script src="play.js"> </script>
</html>
*/

function makeBold(element, callback) {
  element.style.fontWeight = 'bold';
  if (callback && typeof callback === 'function') {
    callback(element);
  }
}

const sectionElement = document.querySelector('section');
makeBold(sectionElement, function(elem) {
    elem.classList.add('highlight');
  });

sectionElement.classList.contains('highlight'); // true
sectionElement.style.fontWeight; // 'bold'

// Further Explore

const sectionElement = document.querySelector('section');

function makeBold(element) {
  element.style.fontWeight = 'bold';
  const event = new CustomEvent('bolded')
  
  element.dispatchEvent(event);
}

//make highlight after it has been bolded
sectionElement.addEventListener('bolded', (event) => {
  console.log(event.target.tagName);
  event.target.classList.add('highlight');
})

makeBold(sectionElement);
