import React, { useEffect, useRef } from "react";
import "../App.css";

function MessageList({ messages, username }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="message-list-container">
      {messages.length === 0 ? (
        <div className="empty-messages">
          💬 No messages yet. Start the conversation!
        </div>
      ) : (
        messages.map((msg) => {
          const isSent = msg.sender === username;
          const messageTime = new Date(msg.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={msg._id || Math.random()}
              className={`message-wrapper ${isSent ? "sent" : "received"}`}
            >
              <div className={`message-bubble ${isSent ? "sent" : "received"}`}>
                {!isSent && (
                  <span className="message-sender">{msg.sender}</span>
                )}
                <p className="message-text">{msg.text}</p>
                <span className="message-time">{messageTime}</span>
              </div>
            </div>
          );
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;
