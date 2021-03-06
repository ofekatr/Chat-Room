const { formatMessage } = require("./messages");
const { userJoin, getUser, userLeave, getRoomUsers } = require("./users");

function defineSocket(io) {
  let username = "";
  const bot_username = "Chat Bot";

  io.on("connection", (socket) => {
    socket.on("joinRoom", ({ username, room }) => {
      userJoin({
        id: socket.id,
        username,
        room,
      });

      socket.join(room);

      socket.broadcast
        .to(room)
        .emit(
          "join",
          formatMessage(bot_username, `${username} has joined the chat room!`)
        );

      io.to(room).emit("roomUsers", { room, users: getRoomUsers(room) });
    });

    socket.on("disconnect", () => {
      const user = userLeave(socket.id);

      if (user) {
        const { username, room } = user;
        io.to(room).emit(
          "message",
          formatMessage(bot_username, `${username} has left the chat room.`)
        );

        io.to(room).emit("roomUsers", { room, users: getRoomUsers(room) });
      }
    });

    socket.on("sendMessage", (msg) => {
      const { username, room } = getUser(socket.id);
      io.to(room).emit("message", formatMessage(username, msg));
    });
  });
}

module.exports = {
  defineSocket,
};
