import React, { useEffect, useState } from "react";
import { socket } from "../socket";
import MessageList from "./Messagelist";
import MessageInput from "./Messageinput";
import "../App.css";

function ChatRoom({ username, room, userEmail, onLogout }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Load previous messages
    socket.on("load_messages", (oldMessages) => {
      setMessages(oldMessages);
    });

    // Receive public messages
    socket.on("receive_public_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Receive private messages
    socket.on("receive_private_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receive_public_message");
      socket.off("receive_private_message");
      socket.off("load_messages");
    };
  }, []);

  const sendMessage = (text) => {
    if (room.startsWith("private")) {
      socket.emit("send_private_message", {
        room,
        sender: username,
        text,
      });
    } else {
      socket.emit("send_public_message", {
        room,
        sender: username,
        text,
      });
    }
  };

  return (
    <div className="chatroom-container">
      <div className="chatroom-wrapper">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <h2 className="chat-header-room">
              {room.includes("private") ? "🔒 " : "👥 "} {room}
            </h2>
            <p className="chat-header-user">{username}</p>
          </div>
          <div className="chat-header-actions">
            <div className="online-status"></div>
            <button onClick={onLogout} className="chat-logout-btn">
              Logout
            </button>
          </div>
        </div>

        {/* Messages */}
        <MessageList messages={messages} username={username} />

        {/* Message Input */}
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
}

export default ChatRoom;
