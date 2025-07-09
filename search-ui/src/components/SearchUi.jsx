import React, { useEffect, useState } from "react";

function SearchUi() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [cache, setCache] = useState({});

  async function fetchData() {
    // if cache have data, send the data from here
    if (cache[searchText]) {
      setSearchResults(cache[searchText]);
    } else {
      // if cache does not have data, then make the API call and store the data in cache
      const response = await fetch(
        "https://www.google.com/complete/search?client=firefox&q=" + searchText
      );
      const data = await response.json();
      cache[searchText] = data[1];
      setSearchResults(data[1]);
    }
  }

  useEffect(() => {
    // Debouncing
    const s = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(s);
  }, [searchText]);

  return (
    <div className="searchUiContainer">
      <input
        type="text"
        className="inputBox"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        onFocus={() => setIsResultVisible(true)}
        onBlur={() => setIsResultVisible(false)}
      />
      {searchResults.length > 1 && isResultVisible && (
        <ul className="searchList">
          {searchResults.map((r) => (
            <li className="searchItem" key={r}>
              {r}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchUi;
