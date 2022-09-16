import EventEmitter from './emitter.js';

class GuessView extends EventEmitter {
  constructor(model, elements) {
    super();
    this.guessModel = model;
    this.elements = elements;
    
    this.guessModel.on('incorrectGuessesChange', 
    (count) => this.incorrectGuesses(count));
    this.guessModel.on('addLetter', 
    (letter) => this.addLetterToGuesses(letter));
    
    this.elements.replay.addEventListener('click', 
      (event) => {
        event.preventDefault();
        this.emit('newGame');
      });
  }

  bind() {
    this.processGuessHandler = (event) => this.emit('keyPressed', event.key);
    document.addEventListener('keyup', this.processGuessHandler);
  }

  unbind() {
    document.removeEventListener("keyup",this.processGuessHandler)
  }

  addLetterToGuesses(letter) {
    let span = document.createElement('span');
    span.textContent = letter;
    this.elements.guesses.insertAdjacentElement('beforeend', span)
  }

  incorrectGuesses(count) {
    let appleClass = this.elements.apples.classList;
    appleClass.replace(`guess_${count - 1}`, `guess_${count}`);
  }

  displayGameOver() {
    this.displayMessage('Game Over');
  }

  createBlanks(word) {
    let spaces = (new Array(word.length + 1)).join("<span></span>");

    let spans = this.elements.letters.querySelectorAll("span");
    spans.forEach(span => {
      span.parentNode.removeChild(span);
    });

    this.elements.letters.insertAdjacentHTML('beforeend', spaces);
    this.elements['spaces'] = document.querySelectorAll("#spaces span");
  }

  displayMessage(text) {
    this.elements.message.textContent = text;
  }

  displayReplayLInk() {
    this.elements.replay.classList.replace('hide', 'show')
  }

  hideReplayLink() {
    this.elements.replay.classList.replace('show', 'hide')
  }

  setClass(count) {
    this.elements.apples.classList.remove(...apples.classList);
    this.elements.apples.classList.add("guess_" + count);
  }

  updateWord(indexes, arg) {
    let spans = this.elements.letters.querySelectorAll('span');
    indexes.forEach(idx => {
      spans[idx].textContent = arg;
    }); 
  }

  getLetters() {
   let spans = this.elements.letters.querySelectorAll('span');
   return [...spans].map(span => span.textContent);
  }

  clearGuesses() {
    let spans = this.elements.guesses.querySelectorAll("span");
    spans.forEach(span => {
      span.parentNode.removeChild(span);
    })
  }

  setGameStatus(status) {
    document.body.classList.remove('win', 'lose');
    if (status) {
      document.body.classList.add(status);
    }
  }
}

export default GuessView;