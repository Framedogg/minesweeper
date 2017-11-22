//This class handles all things to do with the board
export class Board {
  constructor(numberOfRows, numbersOfColumns, numberOfBombs) {
    this._numberOfBombs=numberOfBombs;
    this._numberofTiles= (numberOfRows*numbersOfColumns);
    this._playerBoard=Board.generatePlayerBoard(numberOfRows, numbersOfColumns);
    this._bombBoard=Board.generateBombBoard(numberOfRows, numbersOfColumns, numberOfBombs);
  }
  get playerBoard(){
    return this._playerBoard;
  }

  //This code flips the tile and marks it.
  flipTile(rowIndex, columnIndex){
    if(this._playerBoard[rowIndex][columnIndex] !== ' '){
      console.log('This tile has already been flipped!');
      return
    }else if (this._bombBoard[rowIndex][columnIndex] === 'B'){
      this._playerBoard[rowIndex][columnIndex] = 'B';
    }else{
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex,columnIndex);
      this._numberOfTiles --;
      }
    }

    //This code check the number of bombs in neighboring squares.
    getNumberOfNeighborBombs(rowIndex, columnIndex) {
          const neighborOffsets = [
            [-1,-1],
            [-1,0],
            [-1,1],
            [0,-1],
            [0,1],
            [1,-1],
            [1,0],
            [1,1],
          ];
          const numberOfRows = this._bombBoard.length;
          const numberOfColumns = this._bombBoard[0].length;
          let numberOfBombs = 0;
          neighborOffsets.forEach(offset => {
            const neighborRowIndex = rowIndex + offset[0];
            const neighborColumnIndex = columnIndex + offset[1];
            if (neighborRowIndex >= 0 &&
              neighborRowIndex <= numberOfRows &&
              neighborColumnIndex >= 0 &&
              neighborColumnIndex < numberOfColumns) {
              if (this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
                numberOfBombs++;
              }
            }
          });
            return numberOfBombs;
    }
  //Checks to see if there are any safe tiles
  hasSafeTiles(){
    return (this._numberOfTiles !== this._numberOfBombs);
  }

  //prints out player board
  print() {
    console.log(this._playerBoard.map( row => row.join(' | ')).join('\n'));
  }

  //generate a game board randomly
  static generatePlayerBoard(numberOfRows, numbersOfColumns){
    let board = [];
    for (let rowNumbers=0; rowNumbers < numberOfRows; rowNumbers++){
      let row = [];
      for (let columnNumber=0; columnNumber < numbersOfColumns; columnNumber++){
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  //generate a bomb board
  static generateBombBoard (numberOfRows, numbersOfColumns, numberOfBombs){
    let board = [];
    for (let rowNumbers=0; rowNumbers < numberOfRows; rowNumbers++){
      let row = [];
      for (let columnNumber=0; columnNumber < numbersOfColumns; columnNumber++){
        row.push(null);
      }
      board.push(row);
    }
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs){
      let randomRowIndex = Math.floor(Math.random()* numberOfRows);
      let randomColumnIndex = Math.floor(Math.random()* numbersOfColumns);
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
}
