import React from "react";
import { eventBus } from "../utils/EventEmitter";

function LoginForm() {
  function handleLogin() {
    const user = { name: "Subrata" };
    eventBus.emit("user:login", user);
    eventBus.emit("notify", `Welcome ${user.name}🎉`);
  }
  return <button onClick={handleLogin}>🔓 Login</button>;
}

export default LoginForm;
