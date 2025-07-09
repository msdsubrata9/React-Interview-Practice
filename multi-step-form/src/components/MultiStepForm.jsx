import React from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useState } from "react";

const Page = {
  Step1: 1,
  Step2: 2,
  Step3: 3,
};

const FINAL_STEP = Page.Step3;

function MultiStepForm({ onSubmit = () => {}, onCancel = () => {} }) {
  const [currentStep, setCurrentStep] = useState(Page.Step1);

  const [inputs, setInputs] = useState({
    step1: {
      firstName: "",
      email: "",
    },
    step2: {
      phone: "",
      city: "",
    },
    step3: {
      salary: "",
      bank: "",
    },
  });

  const Steps = {
    [Page.Step1]: Step1,
    [Page.Step2]: Step2,
    [Page.Step3]: Step3,
  };

  const Component = Steps[currentStep];

  const submitButtonText = FINAL_STEP === currentStep ? "Save" : "Next";

  function handleNext() {
    if (currentStep === Page.Step1) {
      // do some logic
      setCurrentStep(currentStep + 1);
    } else if (currentStep === Page.Step2) {
      // do some logic
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Submit Data", inputs);
      onSubmit(inputs);
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  function handleInputChange({ stepKey, value, inputKey }) {
    const oldInputs = structuredClone(inputs);

    oldInputs[stepKey][inputKey] = value;

    setInputs(oldInputs);
  }

  const inputToSend = inputs[`step${currentStep}`];

  console.log("Current Step: ", currentStep);

  return (
    <div className="multi_step_form">
      {currentStep > Page.Step1 && <button onClick={handleBack}>Back</button>}
      <form>
        <Component
          stepKey={`step${currentStep}`}
          onChange={handleInputChange}
          inputs={inputToSend}
        />

        <div>
          <button type="button" onClick={onCancel} className="">
            Cancel
          </button>
          <button type="button" onClick={handleNext} className="success">
            {submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MultiStepForm;
