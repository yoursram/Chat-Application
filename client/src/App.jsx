import React, { useState } from "react";
import JoinRoom from "./components/Joinroom";
import ChatRoom from "./components/Chatroom";

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <div>
      {!joined ? (
        <JoinRoom
          setUsername={setUsername}
          setRoom={setRoom}
          onJoin={() => setJoined(true)}
        />
      ) : (
        <ChatRoom username={username} room={room} />
      )}
    </div>
  );
}

export default App;
