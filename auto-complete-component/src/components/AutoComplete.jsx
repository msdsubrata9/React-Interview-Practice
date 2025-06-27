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
