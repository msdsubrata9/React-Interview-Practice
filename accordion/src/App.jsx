import "./App.css";
import Accordion from "./components/Accordion";

function App() {
  return (
    <>
      <h1>Accordion</h1>
      <Accordion heading="Learning React">
        <div>
          <h4>Hey there I am Learning React</h4>
          <h4>Hey there I am Learning React</h4>
          <h4>Hey there I am Learning React</h4>
          <h4>Hey there I am Learning React</h4>
        </div>
      </Accordion>
      <details>
        <summary>Learning Javascript</summary>
        <div>
          <h4>Hey there I am Learning React</h4>
          <h4>Hey there I am Learning React</h4>
          <h4>Hey there I am Learning React</h4>
          <h4>Hey there I am Learning React</h4>
        </div>
      </details>
    </>
  );
}

export default App;
