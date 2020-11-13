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
let username = '';
let room = '';
const bot_username = "Chat Bot";
io.on("connection", (socket) => {
  console.log("New web socket connetcion.");

  socket.broadcast.emit("join", formatMessage(bot_username, `${username} has joined the chat room!`));

  socket.on("joinRoom", payload => {
    username = payload.username;
    room = payload.room;
  });

  socket.on("disconnect", () => {
    io.emit("message", formatMessage(bot_username, `${username} has left the chat room.`));
  });

  socket.on("sendMessage", (msg) => {
    io.emit("message", formatMessage(username, msg));
  });
});

const port = PORT || 8080;
server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
