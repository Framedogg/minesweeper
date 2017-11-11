'use strict';

//generate a game board randomly
var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numbersOfColumns) {
  var board = [];
  for (var rowNumbers = 0; rowNumbers < numberOfRows; rowNumbers++) {
    var row = [];
    for (var columnNumber = 0; columnNumber < numbersOfColumns; columnNumber++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

console.log(generatePlayerBoard(2, 3));

//generate a bomb board
var generateBombBoard = function generateBombBoard(numberOfRows, numbersOfColumns, numberOfBombs) {
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
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
    //potential for bombs on bombs
  }

  return board;
};
var printBoard = function printBoard(board) {
  console.log(board.map(function (row) {
    return row.join(' | ');
  }).join('\n'));
};
var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);
console.log('Player Board: ' + printBoard(playerBoard));
console.log('Bomb Board: ' + printBoard(bombBoard));