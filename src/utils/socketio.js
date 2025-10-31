// Import socketio and create a export of a created socket => backend socket.
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default socket;
