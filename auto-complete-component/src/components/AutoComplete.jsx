import React, { useCallback, useState } from "react";
import InputText from "./InputText";
import Button from "./Button";
import Suggestions from "./Suggestions";

function debounce(callback, delay) {
  let timeoutId = "";
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

function AutoComplete({
  debounceInput = false,
  isLoading,
  suggestions,
  onChange = () => {},
}) {
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);

  /* 
  Why useCallback() is required here:

  1. The same debounced function is reused across re-renders

  2. The internal timeoutId stays consistent

  If we do not wrap the debounce function with useCallback()

  then On every re-render, debounce(onChange, 200) creates a new debounced function.

  So the timer (inside the debounce) resets every time the component renders.
 
  */
  const debouncedFunction = useCallback(debounce(onChange, 200), []);

  function handleChangeQuery(value) {
    setQuery(value);
    manageDebouncing(value);
    setShowList(true);
  }
  function handleClear() {
    setQuery("");
  }
  function handleSuggestionSelected(selectedSuggestion) {
    setQuery(selectedSuggestion);
    manageDebouncing(selectedSuggestion);
    setShowList(false);
  }
  function manageDebouncing(value) {
    if (debounceInput) {
      debouncedFunction(value);
    } else {
      onChange(value);
    }
  }
  const filteredQuery = suggestions.filter((suggestion) => {
    return suggestion.toLowerCase().includes(query.toLowerCase());
  });

  let showSuggestionWithLoader = !!query.length && showList;
  if (isLoading && query.length) showSuggestionWithLoader = true;

  return (
    <div className="autoComplete">
      <div className="inputContainer">
        <InputText value={query} onChange={handleChangeQuery} />
        <Button label={"Clear"} onClick={handleClear} />
      </div>
      {showSuggestionWithLoader && (
        <Suggestions
          isLoading={isLoading}
          suggestions={filteredQuery}
          onSelect={handleSuggestionSelected}
          selectedSuggestion={query}
        />
      )}
    </div>
  );
}

export default AutoComplete;
