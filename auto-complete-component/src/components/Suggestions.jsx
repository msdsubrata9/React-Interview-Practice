import React from "react";
import Button from "./Button";

function Suggestions({ isLoading, suggestions, onSelect, selectedSuggestion }) {
  if (isLoading) {
    return <h1 className="suggestions">Loading...</h1>;
  }

  return (
    <div className="suggestions">
      {suggestions.map((suggestion) => {
        return (
          <ListItem
            key={suggestion}
            suggestion={suggestion}
            onSelect={onSelect}
            selectedSuggestion={selectedSuggestion}
          />
        );
      })}
    </div>
  );
}

export default Suggestions;

function ListItem({ suggestion, onSelect, selectedSuggestion }) {
  function handleSelect() {
    onSelect(suggestion);
  }
  return (
    <Button
      data-selected={
        suggestion.toLowerCase() === selectedSuggestion.toLowerCase()
      }
      onClick={handleSelect}
      label={suggestion}
    />
  );
}
