/*
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8">
    <title>Bold Element + Custom</title>
  </head>
  <style>
  </style>
  <body>
    <form id="selection-filters" method="post" action="#">
      <select id="animal-classifications">
        <option value="Classifications" selected>Classifications</option>
        <option value="Vertebrate">Vertebrate</option>
        <option value="Warm-blooded">Warm-blooded</option>
        <option value="Cold-blooded">Cold-blooded</option>
        <option value="Mammal">Mammal</option>
        <option value="Bird">Bird</option>
      </select>
      <select id="animals">
        <option value="Animals" selected>Animals</option>
        <option value="Bear">Bear</option>
        <option value="Turtle">Turtle</option>
        <option value="Whale">Whale</option>
        <option value="Salmon">Salmon</option>
        <option value="Ostrich">Ostrich</option>    
      </select>
      <button id="clear">Clear</button>  
    </form>
  </body>
  **<script src="play.js"> </script>**
</html>
*/


const animalClassifications = document.querySelector('#animal-classifications');
const animals = document.querySelector('#animals');
const clearFiltersBtn = document.querySelector('#clear');
let animalClassificationsValue;
let animalsValue;

function setOptions({options}, filters) {
  options.length = 0;
  filters.forEach((value, index) => {
    options[index] = new Option(value)
  });
}
const linkedOptions = {
  classifications: {
    Vertebrate: ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
    'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
    'Cold-blooded': ['Salmon', 'Turtle'],
    Mammal: ['Bear', 'Whale'],
    Bird: ['Ostrich'],
    Classifications: ['Animals', 'Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
  },
  animals: {
    Bear: ['Vertebrate', 'Warm-blooded', 'Mammal'],
    Turtle: ['Vertebrate', 'Cold-blooded'],
    Whale: ['Vertebrate', 'Warm-blooded', 'Mammal'],
    Salmon: ['Vertebrate', 'Cold-blooded'],
    Ostrich: ['Vertebrate', 'Warm-blooded', 'Bird'],
    Animals: ['Classifications', 'Vertebrate', 'Warm-blooded', 'Cold-blooded', 'Mammal', 'Bird'],
  },
};

function setDefault(event) {
  event.preventDefault();
  setOptions(animalClassifications, ['Classifications', 'Vertebrate', 'Warm-blooded', 'Cold-blooded', 'Mammal', 'Bird']);
  setOptions(animals,  ['Animals', 'Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich']);  
}

animalClassifications.addEventListener('change', event => {
  animalClassificationsValue = animalClassifications.options[animalClassifications.selectedIndex].value
  setOptions(animals, linkedOptions['classifications'][animalClassificationsValue])
});

animals.addEventListener('change', event => {
  animalsValue = animals.options[animals.selectedIndex].value
  setOptions(animalClassifications, linkedOptions['animals'][animalsValue])
});

clearFiltersBtn.addEventListener('click', setDefault);

