'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//This class will make calls to the Board Class to play the game
var Game = function () {
  function Game(numberOfRows, numbersOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    this._board = new Board(numberOfRows, numbersOfColumns, numberOfBombs);
  }

  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      this._board.flipTile(rowIndex, columnIndex);
      if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
        console.log('Game Over');
        this._board.print();
      } else if (!this._board.hasSafeTiles()) {
        console.log('Congratulations on Defeating me. This time.');
      } else {
        console.log('Current Board: ');
        this._board.print();
      }
    }
  }]);

  return Game;
}();

//This class handles all things to do with the board


var Board = function () {
  function Board(numberOfRows, numbersOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberofTiles = numberOfRows * numbersOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numbersOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numbersOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',


    //This code flips the tile and marks it.
    value: function flipTile(rowIndex, columnIndex) {
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        this._numberOfTiles--;
      }
    }

    //This code check the number of bombs in neighboring squares.

  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      var numberOfBombs = 0;
      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
            numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    }
    //Checks to see if there are any safe tiles

  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }

    //prints out player board

  }, {
    key: 'print',
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }

    //generate a game board randomly

  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numbersOfColumns) {
      var board = [];
      for (var rowNumbers = 0; rowNumbers < numberOfRows; rowNumbers++) {
        var row = [];
        for (var columnNumber = 0; columnNumber < numbersOfColumns; columnNumber++) {
          row.push(' ');
        }
        board.push(row);
      }
      return board;
    }

    //generate a bomb board

  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numbersOfColumns, numberOfBombs) {
      var board = [];
      for (var rowNumbers = 0; rowNumbers < numberOfRows; rowNumbers++) {
        var row = [];
        for (var columnNumber = 0; columnNumber < numbersOfColumns; columnNumber++) {
          row.push(null);
        }
        board.push(row);
      }
      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numbersOfColumns);
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
        //potential for bombs on bombs
      }
      return board;
    }
  }]);

  return Board;
}();

var g = new Game(3, 3, 3);

g.playMove(0, 0);

//console.log(generatePlayerBoard(2,3));


/*let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);
console.log('Player Board: ' );
  printBoard(playerBoard);
console.log('Bomb Board: ' );
printBoard(bombBoard);
flipTile(playerBoard,bombBoard,0,0);
console.log('Updated Player Board: ');
printBoard(playerBoard);*/