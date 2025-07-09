import React from "react";
import { eventBus } from "../utils/EventEmitter";

function LogoutButton() {
  function handleLogout() {
    eventBus.emit("user:logout");
    eventBus.emit("notify", "You have been logged out👋");
  }
  return <button onClick={handleLogout}>🔒 Logout</button>;
}

export default LogoutButton;
