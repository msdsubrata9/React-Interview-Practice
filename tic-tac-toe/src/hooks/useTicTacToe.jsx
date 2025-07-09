import { useState } from "react";

const initialBoard = (boardSize) => Array(boardSize * boardSize).fill(null);

function useTicTacToe(boardSize) {
  const [board, setBoard] = useState(initialBoard(boardSize));
  const [isXNext, setIsXNext] = useState(true);

  function generateWinningPatterns() {
    const patterns = [];

    for (let i = 0; i < boardSize; i++) {
      const horizontalPattern = [];
      const verticalPattern = [];
      for (let j = 0; j < boardSize; j++) {
        horizontalPattern.push(i * boardSize + j);
        verticalPattern.push(j * boardSize + i);
      }
      patterns.push(horizontalPattern);
      patterns.push(verticalPattern);
    }

    const diagonal1 = [];
    const diagonal2 = [];

    for (let i = 0; i < boardSize; i++) {
      diagonal1.push(i * (boardSize + 1));
      diagonal2.push((i + 1) * (boardSize - 1));
    }
    patterns.push(diagonal1);
    patterns.push(diagonal2);

    return patterns;
  }

  const WINNING_PATTERNS = generateWinningPatterns();
  console.log(WINNING_PATTERNS);

  function calculateWinner(currentBoard) {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      //   const [a, b, c] = WINNING_PATTERNS[i];

      const pattern = WINNING_PATTERNS[i];
      let countX = 0;
      let countO = 0;

      for (let j = 0; j < pattern.length; j++) {
        const cell = currentBoard[pattern[j]];
        if (cell === "X") countX++;
        else if (cell === "O") countO++;
      }
      if (countX === boardSize) return "X";
      else if (countO === boardSize) return "Y";
    }
    return null;
  }
  function handleClick(index) {
    // check winner
    const winner = calculateWinner(board);
    console.log(winner);

    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function getStatusMessage() {
    const winner = calculateWinner(board);
    if (winner) return `Player ${winner} wins!!!`;

    if (!board.includes(null)) return `It's a Draw!!!`;
    return `Player ${isXNext ? "X" : "O"} turn`;
  }

  function resetGame() {
    setBoard(initialBoard(boardSize));
    setIsXNext(true);
  }

  return { board, handleClick, calculateWinner, getStatusMessage, resetGame };
}

export default useTicTacToe;
