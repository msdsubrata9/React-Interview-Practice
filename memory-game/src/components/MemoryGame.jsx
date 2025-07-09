import React, { useEffect } from "react";
import { useState } from "react";

function MemoryGame() {
  const [gridSize, setGridSize] = useState(2);
  const [cards, setCards] = useState([]);

  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const [won, setWon] = useState(false);

  const [maxMoves, setMaxMoves] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function handleGridSizeChange(event) {
    const size = parseInt(event.target.value);
    if (size >= 2 && size <= 10) setGridSize(size);
  }

  function initialGame() {
    const totalCards = gridSize * gridSize;
    const pairCount = Math.floor(totalCards / 2);

    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);

    const shuffleCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({ id: index, number }));

    setCards(shuffleCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);
    setMoves(0);
    setGameOver(false);
  }

  function checkMatch(secondId) {
    let [firstId] = flipped;
    if (cards[firstId].number === cards[secondId].number) {
      setSolved([...solved, firstId, secondId]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  }

  function handleClick(id) {
    if (disabled || gameOver) return;

    if (flipped.length === 0) {
      setFlipped([id]);
      setMoves(moves + 1);
      return;
    }

    if (flipped.length === 1) {
      setDisabled(true);

      if (id !== flipped[0]) {
        setFlipped([...flipped, id]);
        // check the match logic
        setMoves(moves + 1);
        checkMatch(id);
      } else {
        setFlipped([]);
        setDisabled(false);
      }
    }
  }

  const isFlipped = (id) => flipped.includes(id) || solved.includes(id);
  const isSolved = (id) => solved.includes(id);

  useEffect(() => {
    initialGame();
  }, [gridSize, maxMoves]);

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);
      setGameOver(true);
    } else if (maxMoves > 0 && moves >= maxMoves) {
      setGameOver(true);
    }
  }, [solved, cards, moves, maxMoves]);

  function handleMaxMovesChange(event) {
    const moves = parseInt(event.target.value);
    if (moves >= 0) setMaxMoves(moves);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-grey-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Memory Game</h1>
      {/* Input */}
      <div className="mb-4 flex space-x-4">
        <div>
          <label htmlFor="gridSize" className="mr-2">
            Grid Size: (Maximum 10)
          </label>
          <input
            type="number"
            id="gridSize"
            value={gridSize}
            min={2}
            max={10}
            onChange={handleGridSizeChange}
            className="border-2 border-gray-300 rounded px-2 py-1 w-16"
          />
        </div>
        <div>
          <label htmlFor="maxMoves" className="mr-2">
            Max moves: (0 for unlimited)
          </label>
          <input
            type="number"
            id="maxMoves"
            min="0"
            value={maxMoves}
            onChange={handleMaxMovesChange}
            className="border-2 border-gray-300 rounded px-2 py-1 w-16"
          />
        </div>
      </div>

      <div className="mb-4 text-xl">
        Moves: {moves} {moves > 0 && `/ ${maxMoves}`}
      </div>

      {/* Game Board */}
      <div
        className="grid gap-2 mb-4"
        style={{
          gridTemplateColumns: `repeat(${gridSize},1fr)`,
          width: `min(100%, ${gridSize * 5.5}rem)`,
        }}
      >
        {cards.map((card) => {
          return (
            <div
              key={card.id}
              onClick={() => handleClick(card.id)}
              className={`aspect-square flex items-center justify-center text-xl 
              font-bold cursor-pointer transition-all delay-300 rounded-lg 
              ${
                isFlipped(card.id)
                  ? isSolved(card.id)
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              } ${gameOver ? "pointer-events-none" : ""}`}
            >
              {isFlipped(card.id) ? card.number : "?"}
            </div>
          );
        })}
      </div>

      {/* Result  */}
      {gameOver && (
        <div
          className={`mt-4 text-4xl font-bold animate-bounce ${
            won ? " text-green-600" : "text-red-600"
          }`}
        >
          {won ? "You Won!!!" : "Game Over"}
        </div>
      )}

      {/* Reset / Play Again Button  */}
      <button
        onClick={initialGame}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded 
      hover:bg-green-600 transition-colors"
      >
        {won ? "Play Again" : "Reset"}
      </button>
    </div>
  );
}

export default MemoryGame;
