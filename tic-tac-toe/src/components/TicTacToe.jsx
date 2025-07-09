import useTicTacToe from "../hooks/useTicTacToe";

function TicTacToe({ boardSize = 3 }) {
  const { board, handleClick, getStatusMessage, resetGame } =
    useTicTacToe(boardSize);

  return (
    <div className="game" style={{ "--board-size": boardSize }}>
      <div className="status">
        <div>{getStatusMessage()}</div>
        <button className="reset_button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
      <div className="board">
        {board.map((b, index) => {
          return (
            <button
              className="cell"
              key={index}
              onClick={() => handleClick(index)}
              disabled={b !== null}
            >
              {b}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TicTacToe;
