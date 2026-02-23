import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import JoinRoom from "./components/Joinroom";
import ChatRoom from "./components/Chatroom";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setIsAuthenticated(true);
      setUserEmail(user.email);
    }
  }, []);

  const handleLogin = (email) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserEmail("");
    setUsername("");
    setRoom("");
    setJoined(false);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : !joined ? (
        <JoinRoom
          userEmail={userEmail}
          setUsername={setUsername}
          setRoom={setRoom}
          onJoin={() => setJoined(true)}
          onLogout={handleLogout}
        />
      ) : (
        <ChatRoom 
          username={username} 
          room={room}
          userEmail={userEmail}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
