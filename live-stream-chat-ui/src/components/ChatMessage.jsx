import React from "react";

function ChatMessage({ photo, name, message }) {
  return (
    <div className="chatMessageContainer">
      <img className="userImage" src={photo} alt={name} />
      <p>
        <span className="user_name">{name} - </span>
        <span className="user_message">{message}</span>
      </p>
    </div>
  );
}

export default ChatMessage;
