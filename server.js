require("dotenv").config();
const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const { formatMessage } = require("./src/utils/messages");

const { PORT } = process.env;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));
const username = "John Doe";
io.on("connection", (socket) => {
  console.log("New web socket connetcion.");

  socket.emit("message", formatMessage(username, `Welcome, ${username}!`));

  socket.broadcast.emit("join", formatMessage(username, `${username} has joined the chat room!`));

  socket.on("disconnect", () => {
    io.emit("message", formatMessage(username, `${username} has left the chat room.`));
  });

  socket.on("sendMessage", (msg) => {
    io.emit("message", formatMessage(username, msg));
  });
});

const port = PORT || 8080;
server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
