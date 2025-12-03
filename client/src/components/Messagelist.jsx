import React from "react";

function MessageList({ messages }) {
  return (
    <div
     className="h-96 overflow-y-scroll bg-gray-800 p-4 rounded-lg mb-4 border border-gray-600"
    >
      {messages.map((msg) => (
        <div key={msg._id || Math.random()}>
          <strong>{msg.sender}:</strong> {msg.text}
          <br />
          <small>{new Date(msg.time).toLocaleTimeString()}</small>
          
        </div>
      ))}
    </div>
  );
}

export default MessageList;
