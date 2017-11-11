//generate a game board randomly
const generatePlayerBoard = (numberOfRows, numbersOfColumns) =>{
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

console.log(generatePlayerBoard(2,3));

//generate a bomb board
const generateBombBoard = (numberOfRows, numbersOfColumns, numberOfBombs) =>{
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
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
    //potential for bombs on bombs
  }



  return board;
}
const printBoard = board =>{
  console.log(board.map( row => row.join(' | ')).join('\n'));
}
let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);
console.log('Player Board: ' +  printBoard(playerBoard));
console.log('Bomb Board: ' + printBoard(bombBoard));
