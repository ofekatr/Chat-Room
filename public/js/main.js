const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const usersList = document.getElementById("users");

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

socket.emit("joinRoom", { username, room });

socket.on("message", (msg) => {
  outputMessage(msg);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on("join", (msg) => {
  outputMessage(msg);
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;
  socket.emit("sendMessage", msg);

  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

function outputMessage({ username, text, time }) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${username} <span>${time}</span></p>
    <p class="text">
        ${text}
    </p>`;

  document.querySelector(".chat-messages").appendChild(div);
}

socket.on("roomUsers", ({ room, users }) => {
  outputUsers(users);
  outputRoom(room);
});

function outputUsers(users) {
  usersList.innerHTML = `${users.map(({ username }) => `<li>${username}</li>`).join('')}`;
}

function outputRoom(room) {
  roomName.innerText = room;
}
