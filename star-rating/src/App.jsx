import "./App.css";
import StarRating from "./components/StarRating";

function App() {
  function handleChange(value) {
    console.log(value);
  }
  return (
    <>
      <StarRating value={0} onChange={handleChange} />
    </>
  );
}

export default App;
