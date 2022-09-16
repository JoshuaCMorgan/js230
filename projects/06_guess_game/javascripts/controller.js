import GuessModel from './model.js';
import GuessView from './view.js';
import EventEmitter from './emitter.js';

class GuessController {
  constructor(guessModel, guessView) {
    this.guessModel = guessModel;
    this.guessView = guessView;
    guessView.on('keyPressed', (arg) => this.processGuess(arg));
    guessView.on('newGame', () => this.newGame());
    this.newGame();
  }

  newGame() {
    this.guessModel.currentWord = this.guessModel.randomWord();
    let word = this.guessModel.currentWord;
    console.log(word);
    if (!word) {
      this.guessView.hideReplayLink();
      this.guessView.displayMessage('Sorry! No more words');
      return
    }

    this.guessView.clearGuesses();
    this.guessView.bind();
    this.guessView.createBlanks(word);
    this.guessModel.incorrectGuesses = 0;
    this.guessView.setClass(0);
    this.guessView.hideReplayLink();
    this.guessModel.lettersGuessed = [];
    this.guessView.displayMessage("");
  }

  notALetter(letter) {
    return letter < 'a' || letter > 'z';
  }

  hasMatch(letter) {
    return this.guessModel.currentWord.indexOf(letter) !== -1;
  }

  isGameOver() {
    return this.guessModel.incorrectGuesses >= 6;
  }

  isGameWon() {
    let letters = this.guessView.getLetters();
    return [...letters].every(letter => letter !== '')
  }

  duplicateGuess(letter) {
    let duplicate = this.guessModel.lettersGuessed.indexOf(letter) !== -1;
    if (!duplicate) {
      this.guessModel.addLetter(letter);
    }
    return duplicate;
  }

  lose() {
    this.guessView.unbind()
    this.guessView.displayMessage('Game is Over')
    this.guessView.displayReplayLInk();
    this.guessView.setGameStatus('lose')
  }

  won() {
    this.guessView.unbind()
    this.guessView.displayMessage('You win!')
    this.guessView.displayReplayLInk();
    this.guessView.setGameStatus('win');
  }

  processGuess(letter) {
    this.guessView.displayMessage('');

    if (this.notALetter(letter)) {
      this.guessView.displayMessage('Please choose a lowercase letter');
      return;
    }

    if (this.duplicateGuess(letter)) { return; }

    if (this.hasMatch(letter)) {
      let indexes = this.guessModel.getIndexes(letter);
      this.guessView.updateWord(indexes, letter);
    } else {
      this.guessModel.incrementIncorrectCount();
    }
    if (this.isGameOver()) {
      this.lose();
    } else if (this.isGameWon()) {
      this.won();
    }
  }
}

let guessModel = new GuessModel();
let guessView = new GuessView(guessModel, {
  'message' : document.querySelector("#message"),
  'letters' : document.querySelector("#spaces"),
  'guesses' : document.querySelector("#guesses"),
  'apples'  : document.querySelector("#apples"),
  'replay'  : document.querySelector("#replay"),
  'document': document,
});

const game = new GuessController(guessModel, guessView);