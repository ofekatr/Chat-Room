require("dotenv").config();
const http = require("http");
const socketio = require("socket.io");

const { defineSocket } = require("./src/utils/sockets");
const app = require("./src/app");

const { PORT } = process.env;

const server = http.createServer(app);
const io = socketio(server);

defineSocket(io);

const port = PORT || 8080;
server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
