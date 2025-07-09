import React, { useState } from "react";

function MessageInput({ onSendButtonClick }) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSendButtonClick(inputValue);
    setInputValue("");
  }

  return (
    <div className="messageInputContainer">
      <img
        src="https://yt4.ggpht.com/6Sb6tgiNw6PWRWuxv_ZMXfQsV6_29NYZQtvUFB2hSaqQl1-lMoCO342aLYATqjCyedpnA7PQgcE=s64-c-k-c0x00ffffff-no-rj"
        alt="user"
        className="userImage"
      />
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
}

export default MessageInput;
