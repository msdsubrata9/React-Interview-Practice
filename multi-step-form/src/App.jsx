import { useState } from "react";
import "./App.css";
import "./Styles.css";
import MultiStepForm from "./components/MultiStepForm";

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [cancel, setCancel] = useState(false);

  function onSubmit(data) {
    setFormSubmitted(true);
  }
  function onCancel(data) {
    setCancel(true);
  }
  return (
    <>
      {formSubmitted && <h1>Form Submitted</h1>}
      {!formSubmitted && (
        <MultiStepForm onCancel={onCancel} onSubmit={onSubmit} />
      )}
      {cancel && <h1>User wants to cancel</h1>}
    </>
  );
}

export default App;
