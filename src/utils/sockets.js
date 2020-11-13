const { formatMessage } = require("./messages");
const { userJoin, getUser } = require("./users");

function defineSocket(io) {
  let username = "";
  let room = "";
  const bot_username = "Chat Bot";

  io.on("connection", (socket) => {
    console.log("New web socket connetcion.");

    socket.broadcast.emit(
      "join",
      formatMessage(bot_username, `${username} has joined the chat room!`)
    );

    socket.on("joinRoom", (payload) => {
      username = payload.username;
      room = payload.room;
    });

    socket.on("disconnect", () => {
      io.emit(
        "message",
        formatMessage(bot_username, `${username} has left the chat room.`)
      );
    });

    socket.on("sendMessage", (msg) => {
      io.emit("message", formatMessage(username, msg));
    });
  });
}

module.exports = {
  defineSocket,
};
