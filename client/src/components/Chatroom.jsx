import React, { useEffect, useState } from "react";
import { socket } from "../socket";
import MessageList from "./Messagelist";
import MessageInput from "./Messageinput";

function ChatRoom({ username, room }) {
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
    <div className="flex items-center justify-center">
    <div className=" flex flex-col  w-2xl text-white bg-gray-800 p-15  m-3 rounded-2xl">
      <h2 className="text-cyan-400 font-bold">Room: {room}</h2>
      <h4 className="text-cyan-500 font-bold">User: {username}</h4>

      <MessageList messages={messages} />

      <MessageInput onSend={sendMessage} />
    </div>
    </div>
  );
}

export default ChatRoom;
