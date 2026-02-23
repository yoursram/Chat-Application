import React, { useState } from "react";
import "../App.css";

function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const send = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onSend(text);
    setText("");
  };

  return (
    <div className="message-input-container">
      <form onSubmit={send} className="message-input-form">
        <input
          type="text"
          className="message-input-field"
          value={text}
          placeholder="Type a message... Press Enter or click Send"
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(e);
            }
          }}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
