// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import {Board} from './board';

//This class will make calls to the Board Class to play the game
class Game {
  constructor(numberOfRows, numbersOfColumns, numberOfBombs){
    this._board = new Board(numberOfRows,numbersOfColumns,numberOfBombs);
  }

  playMove(rowIndex, columnIndex){
    this._board.flipTile(rowIndex,columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B'){
      console.log('Game Over');
      this._board.print();
    } else if (!this._board.hasSafeTiles()) {
      console.log('Congratulations on Defeating me. This time.');
    }else {
      console.log('Current Board: ');
      this._board.print();
    }
  }
}
