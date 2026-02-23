// src/socket.js
import { io } from "socket.io-client";
const socketIoUrl = process.env.BACKEND_URL;
export const socket = io(socketIoUrl);
