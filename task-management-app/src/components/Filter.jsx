import React, { useState } from "react";

function Filter({ onFilter, optionValues, type }) {
  const [option, setOption] = useState("");
  function handleOptionChange(event) {
    let value = event.target.value;
    setOption(value);
    onFilter(value, type);
  }
  return (
    <div>
      <select
        className="selected__filter"
        value={option}
        onChange={handleOptionChange}
      >
        {optionValues.map((optionVal) => {
          return (
            <option key={optionVal} value={optionVal}>
              {optionVal}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Filter;
