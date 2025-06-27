import "./App.css";
import "./components/Style.css";
import AutoComplete from "./components/AutoComplete";
import { useEffect, useState } from "react";

const Suggestions = ["Apple", "Mango", "Banana", "Kiwi", "Grapes"];

function App() {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    new Promise(function (resolve) {
      setTimeout(() => {
        resolve(Suggestions);
      }, 5000);
    }).then((data) => {
      setSuggestions(data);
      setIsLoading(false);
    });
  }, []);

  function onChange(value) {
    console.log("MAKE API CALL: ", value);
  }
  return (
    <>
      <AutoComplete
        debounceInput={true}
        isLoading={isLoading}
        suggestions={suggestions}
        onChange={onChange}
      />
    </>
  );
}

export default App;
