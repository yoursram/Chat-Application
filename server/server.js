const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectDB = require("./config/database");
const Message = require("./models/Message");

// Connect to database
connectDB();

const app = express();

// configure CORS - allow any origin by default, you can lock this to your frontend URL
// app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || '*' }
});

// ------------------- SOCKET LOGIC -------------------

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // ------------ JOIN ROOM ------------
  socket.on("join_room", async (room) => {
    const roomData = io.sockets.adapter.rooms.get(room);
    const roomSize = roomData ? roomData.size : 0;

    // Private room (max 2 users)
    if (room.startsWith("private")) {
      if (roomSize >= 2) {
        socket.emit("room_full", room);
        return;
      }
    }

    socket.join(room);
    socket.emit("room_joined", room);

    // Fetch & send previous messages
    const oldMessages = await Message.find({ room }).sort({ time: 1 });
    socket.emit("load_messages", oldMessages);
  });

  // ------------ PUBLIC MESSAGE SEND ------------
  socket.on("send_public_message", async ({ room, sender, text }) => {
    const msg = await Message.create({
      room,
      sender,
      text,
      isPrivate: false,
    });

    io.to(room).emit("receive_public_message", msg);
  });

  // ------------ PRIVATE MESSAGE SEND ------------
  socket.on("send_private_message", async ({ room, sender, text }) => {
    const msg = await Message.create({
      room,
      sender,
      text,
      isPrivate: true,
    });

    io.to(room).emit("receive_private_message", msg);
  });

  // ------------ DISCONNECT ------------
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ------------------- START SERVER -------------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
