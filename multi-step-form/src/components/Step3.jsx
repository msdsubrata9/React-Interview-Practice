import React from "react";

function Step3({ inputs, onChange = () => {}, stepKey }) {
  const { salary, bank } = inputs || {};
  function handleChange(inputKey) {
    return (event) => {
      onChange({ value: event.target.value, stepKey, inputKey });
    };
  }
  return (
    <div>
      <fieldset>
        <legend>Financial Information</legend>

        <div className="control_row">
          <label htmlFor="salary">Salary</label>
          <input
            onChange={handleChange("salary")}
            type="text"
            id="salary"
            value={salary}
          />
        </div>

        <div className="control_row">
          <label htmlFor="bank">Bank</label>
          <input
            onChange={handleChange("bank")}
            type="text"
            id="bank"
            value={bank}
          />
        </div>
      </fieldset>
    </div>
  );
}

export default Step3;
