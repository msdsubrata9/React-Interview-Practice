import React from "react";
import { useState } from "react";

const config = [
  [1, 1, 0],
  [0, 1, 1],
  [1, 0, 1],
];

function GridLights() {
  const [stack, setStack] = useState(new Map());

  function handleClick(rowIndex, colIndex) {
    return () => {
      const newStack = structuredClone(stack);
      const key = `${rowIndex}-${colIndex}`;
      if (newStack.get(key) || !config[rowIndex][colIndex]) {
        return;
      } else {
        newStack.set(key, true);
      }
      setStack(newStack);

      const lightSelected = config.flat().reduce((a, b) => a + b, 0);
      if (lightSelected === newStack.size) {
        startRollback();
      }
    };
  }
  function startRollback() {
    const intervalId = setInterval(() => {
      setStack(function (prevStack) {
        const lastKey = Array.from(prevStack.keys()).pop();
        const newStack = structuredClone(prevStack);
        newStack.delete(lastKey);

        if (!newStack.size) {
          clearInterval(intervalId);
        }

        return newStack;
      });
    }, 3000);
  }

  return (
    <div className="grid_light">
      {config.map((row, rowIndex) => {
        return (
          <div className="grid_row" key={rowIndex}>
            {row.map((value, colIndex) => {
              let lightClass = "";
              if (value === 0) {
                lightClass = "off";
              }
              const key = `${rowIndex}-${colIndex}`;
              if (stack.has(key)) {
                lightClass += " on";
              }
              return (
                <div
                  onClick={handleClick(rowIndex, colIndex)}
                  className={`light ${lightClass}`}
                  key={colIndex}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default GridLights;
