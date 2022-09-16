import EventEmitter from './emitter.js';

class GuessModel extends EventEmitter {
  #words;
  #allowedWrongGuesses = 6;

  constructor() {
    super();
    this.#words = ['apple', 'banana', 'pear', 'orange']
    // this.currentWord = this.randomWord();
    // this.incorrectGuesses = 0;
    // this.lettersGuessed = [];
  }

  randomWord() {
    let word = this.#words[Math.floor(Math.random() * this.#words.length)];
    this.#words.splice(this.#words.indexOf(word), 1);
    return word; 
  }

  addLetter(letter) {
    this.lettersGuessed.push(letter);
    this.emit('addLetter', letter)
  }

  getIndexes(letter) {
   let indexes =  this.currentWord.split('').reduce((indexes, char, index) => {
      if (char === letter) {
        indexes.push(index);
        return indexes;
      } else return indexes;
    }, [])
    return indexes;
  }

  incrementIncorrectCount() {
    this.incorrectGuesses += 1;
    this.emit('incorrectGuessesChange', this.incorrectGuesses)
  }
}

export default GuessModel;