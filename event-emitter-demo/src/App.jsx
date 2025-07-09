import "./App.css";
import ChatBox from "./components/ChatBox";
import LoginForm from "./components/LoginForm";
import LogoutButton from "./components/LogoutButton";
import Notification from "./components/Notification";

function App() {
  return (
    <>
      <h1>Custom Event Emitter Demo</h1>
      <LoginForm />
      <LogoutButton />
      <ChatBox />
      <Notification />
    </>
  );
}

export default App;
