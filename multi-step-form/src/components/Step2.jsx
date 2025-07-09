import React from "react";

function Step2({ inputs, onChange = () => {}, stepKey }) {
  const { phone, city } = inputs || {};
  function handleChange(inputKey) {
    return (event) => {
      onChange({ value: event.target.value, stepKey, inputKey });
    };
  }
  return (
    <div>
      <fieldset>
        <legend>Contact Information</legend>

        <div className="control_row">
          <label htmlFor="phone">Phone</label>
          <input
            onChange={handleChange("phone")}
            type="text"
            id="phone"
            value={phone}
          />
        </div>

        <div className="control_row">
          <label htmlFor="city">City</label>
          <input
            onChange={handleChange("city")}
            type="text"
            id="city"
            value={city}
          />
        </div>
      </fieldset>
    </div>
  );
}

export default Step2;
