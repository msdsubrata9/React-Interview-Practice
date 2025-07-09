import React, { useEffect, useState } from "react";
import { eventBus } from "../utils/EventEmitter";

function ChatBox() {
  const [enabled, setEnabled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    function handleLogin(user) {
      setUser(user);
      setEnabled(true);
    }

    function handleLogout() {
      setUser(null);
      setEnabled(false);
    }

    eventBus.on("user:login", handleLogin);
    eventBus.on("user:logout", handleLogout);
    return () => {
      eventBus.remove("user:login", handleLogin);
      eventBus.remove("user:logout", handleLogout);
    };
  }, []);

  return (
    <div>
      {enabled ? (
        <div>
          <p>Welcome to the chat, {user.name}!</p>
          <textarea
            rows={"4"}
            cols={"40"}
            placeholder="Type your message here..."
          />
        </div>
      ) : (
        <p>Please log in to use the chat</p>
      )}
    </div>
  );
}

export default ChatBox;
