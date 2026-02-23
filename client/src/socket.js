// src/socket.js
import { io } from "socket.io-client";

// For Vite the env var should start with VITE_ (set VITE_BACKEND_URL in Vercel or locally)
const backendUrl = (typeof window !== 'undefined')
	? (import.meta.env.VITE_BACKEND_URL)
	: undefined;

// Only attempt connection in browser environment
export const socket = io(backendUrl, {
	// allow websocket and fallback to polling if needed
	transports: ["websocket", "polling"],
	autoConnect: true,
});
