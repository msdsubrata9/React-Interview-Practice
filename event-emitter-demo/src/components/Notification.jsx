import React, { useEffect, useState } from "react";
import { eventBus } from "../utils/EventEmitter";

function Notification() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    function showNotification(msg) {
      setMessage(msg);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
    eventBus.on("notify", showNotification);
    return () => {
      eventBus.remove("notify", showNotification);
    };
  }, []);

  return (
    message && (
      <div
        style={{
          backgroundColor: "#222",
          color: "white",
          padding: "0.75rem",
          marginTop: "1rem",
          borderRadius: "6px",
        }}
      >
        {message}
      </div>
    )
  );
}

export default Notification;
