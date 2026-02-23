import React, { useState } from "react";
import { socket } from "../socket";
import "../App.css";

function JoinRoom({ userEmail, setUsername, setRoom, onJoin, onLogout }) {
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");

  const joinRoom = (e) => {
    e.preventDefault();
    if (!name || !roomName) {
      setError("Please enter both name and room name");
      return;
    }

    setUsername(name);
    setRoom(roomName);

    socket.emit("join_room", roomName);

    socket.on("room_full", () => {
      setError("Room is full! Only 2 users allowed in private rooms.");
    });

    socket.on("room_joined", () => {
      onJoin();
    });
  };

  return (
    <div className="join-room-container">
      <div className="join-room-card">
        <div className="join-room-header">
          <h2>Join a Chat Room</h2>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>

        <p className="subtitle">
          Join a room and start chatting with others. Use "private_" prefix for
          2-user rooms.
        </p>

        <form onSubmit={joinRoom} className="join-room-form">
          <div className="form-group">
            <label htmlFor="username">Your Name</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="roomname">Room Name</label>
            <input
              id="roomname"
              type="text"
              placeholder="e.g., general, private_chat"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <small style={{ color: "#999", marginTop: "4px" }}>
              💡 Tip: Rooms starting with "private_" limit to 2 users. Public
              rooms have no limit.
            </small>
          </div>

          <button type="submit" className="join-btn">
            Join Room
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <div className="user-email">
          👤 Logged in as: <strong>{userEmail}</strong>
        </div>
      </div>
    </div>
  );
}

export default JoinRoom;
