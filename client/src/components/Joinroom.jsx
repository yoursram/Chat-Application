import React, { useState } from "react";
import { socket } from "../socket";

function JoinRoom({ setUsername, setRoom, onJoin }) {
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");


  const joinRoom = (e) => {
    e.preventDefault()
    if (!name || !roomName) {
      setError("Enter name and room");
      return;
    }

    setUsername(name);
    setRoom(roomName);
    
    socket.emit("join_room", roomName);

    socket.on("room_full", () => {
      setError("Room is full! Only 2 users allowed.");
    });

    socket.on("room_joined", () => {
      onJoin();
    });
  };

  return (
    
    <form  on onSubmit={joinRoom} className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <h2 className="text-cyan-300 text-xl font-bold mb-4 text-center"  >Join Public or Private Room</h2>
      <p className="font-bold text-white">If the room is created using the word "private" only 2 users are allowed !!</p>
      <p className=" mb-1 font-bold text-white">Else: there's no restriction for the pubic room</p>

      <input
        className="w-2xs mb-0.5 p-5 rounded-lg bg-gray-800 text-white outline-none"
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        className="w-2xs mb-1 p-5 bg-gray-800 text-white rounded-lg outline-none"
        placeholder="Enter room name (public or private_room)"
        onChange={(e) => setRoomName(e.target.value)}
      />

      <br /><br />

      <button 
      className="w-2xs p-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-lg"
      type="submit"
      >Join</button>

      {error && <p className="text-red-600 mt-2 font-bold text-center">{error}</p>}
     
    </form>
  );
}

export default JoinRoom;
