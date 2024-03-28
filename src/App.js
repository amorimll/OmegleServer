const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    socket.broadcast.emit("user-disconnected", "User disconnected");
  });

  socket.on("message", (message, sessionId) => {
    socket.broadcast.emit("message", message, sessionId);
    console.log(message, sessionId);
  });

  socket.on("offer", (message) => {
    socket.broadcast.emit("offer", message);
  })

  socket.on("answer", (message) => {
    socket.broadcast.emit("answer", message);
  })

  socket.on("candidate", (message) => {
    socket.broadcast.emit("candidate", message);
  })
});

app.use(cors());

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
