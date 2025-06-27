import React from "react";

function InputText({ value, onChange }) {
  function handleChange(event) {
    onChange(event.target.value);
  }
  return <input type="text" value={value} onChange={handleChange} />;
}

export default InputText;
