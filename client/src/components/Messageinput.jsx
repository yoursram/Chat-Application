import React, { useState } from "react";

function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const send = (e) => {
     e.preventDefault();
    if (text.trim() === "") return;
    onSend(text);
    setText("");
  };

  return (
   
    <form 
      onSubmit={send} 
      className="flex gap-2 mt-2"
    >
      <input
        className="flex-1 p-3 rounded-lg bg-gray-700 text-white outline-none"
        value={text}
        placeholder="Type a message..."
        onChange={(e) => setText(e.target.value)}
      />

      <button
        type="submit"
        className="bg-cyan-500 hover:bg-cyan-400 px-5 py-2 rounded-lg text-white"
      >
        Send
      </button>
    </form>
  );
}

export default MessageInput;
