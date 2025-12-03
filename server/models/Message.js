const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  room: { type: String, required: true },
  sender: { type: String, required: true },
  text: { type: String, required: true },
  isPrivate: { type: Boolean, default: false },   // true = private chat
  time: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", messageSchema);
