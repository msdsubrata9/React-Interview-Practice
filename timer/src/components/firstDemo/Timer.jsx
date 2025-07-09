import React, { useRef, useState } from "react";

const TimeFactors = {
  Hour: "hh",
  Minute: "mm",
  Second: "ss",
  MilliSecond: "ms",
};

const Config = {
  [TimeFactors.Hour]: {
    value: "",
    factor: 60 * 60 * 1000,
    placeholder: "HH",
  },
  [TimeFactors.Second]: {
    value: "",
    factor: 1000,
    placeholder: "SS",
  },
  [TimeFactors.Minute]: {
    value: "",
    factor: 60 * 1000,
    placeholder: "MM",
  },
};
const OrderOfTime = [TimeFactors.Hour, TimeFactors.Minute, TimeFactors.Second];

function Timer() {
  const [config, setConfig] = useState(structuredClone(Config));
  const [time, setTime] = useState(0);
  const [timerOver, setTimerOver] = useState(false);

  const timeSpentRef = useRef(0);
  const intervalRef = useRef(null);

  function handleChange({ key }) {
    return (event) => {
      const newConfig = structuredClone(config);
      newConfig[key].value = event.target.value;

      setConfig(newConfig);
    };
  }

  function startAgain() {
    setTimerOver(false);
    handleReset();
  }

  function handleStart() {
    // convert entered time in millisecond
    let totalTimeInMilliseconds = 0;

    OrderOfTime.forEach((key) => {
      const data = config[key];

      const value = data.value;
      const factor = data.factor;

      if (value && !isNaN(value)) {
        totalTimeInMilliseconds += Number(value) * factor;
      }
    });
    // start the timer
    timeSpentRef.current = Date.now() + totalTimeInMilliseconds;

    intervalRef.current = setInterval(() => {
      const newValue = timeSpentRef.current - new Date().getTime();
      if (newValue <= 0) {
        setTimerOver(true);
      } else {
        setTime(() => {
          return newValue;
        });
      }
    }, 10);
  }

  function handlePause() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  function handleReset() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTime(0);
    timeSpentRef.current = 0;
    setConfig(structuredClone(Config));
  }

  function formatTime() {
    const ms = Math.floor((time % 1000) / 10);
    const ss = Math.floor((time / 1000) % 60);
    const mm = Math.floor((time / (60 * 1000)) % 60);
    const hh = Math.floor(time / (60 * 60 * 1000));

    return `${hh}:${mm}:${ss}:${ms}`;
  }

  if (timerOver) {
    return (
      <div>
        <h1>Times Up!!!!!!</h1>{" "}
        <button onClick={startAgain}>Start Again</button>
      </div>
    );
  }

  return (
    <div className="timer">
      <div className="text_fields">
        {OrderOfTime.map((orderKey, index) => {
          const data = config[orderKey];
          return (
            <div key={orderKey}>
              <input
                onChange={handleChange({ key: orderKey, index })}
                value={data.value}
                type="text"
                list={`${orderKey}_datalist`}
                placeholder={data.placeholder}
              />
              <datalist id={`${orderKey}_datalist`}>
                <option value="5" />
                <option value="15" />
                <option value="25" />
                <option value="35" />
                <option value="45" />
              </datalist>
            </div>
          );
        })}
      </div>
      {formatTime()}
      <div className="buttons">
        <button onClick={handleStart}>▶️Play</button>
        <button onClick={handlePause}>⏸️Pause</button>
        <button onClick={handleReset}>🔄Reset</button>
      </div>
    </div>
  );
}

export default Timer;
