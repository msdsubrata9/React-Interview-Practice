import React from "react";
import { useState } from "react";
import OtpInput from "./OtpInput";

function PhoneOtpLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  function handlePhoneNumber(event) {
    setPhoneNumber(event.target.value);
  }
  function handlePhoneSubmit(event) {
    event.preventDefault();

    // phone validations
    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }

    // call BE API
    // show OTP Field
    setShowOtpInput(true);
  }

  function onOtpSubmit(otp) {
    console.log("Login Successful: ", otp);
  }
  return (
    <div>
      {!showOtpInput ? (
        <form onSubmit={handlePhoneSubmit}>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder="enter phone number"
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p>Enter OTP sent to {phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
}

export default PhoneOtpLogin;
