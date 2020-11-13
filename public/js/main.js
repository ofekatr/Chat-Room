const chatForm = document.getElementById("chat-form");

const socket = io();

socket.on("message", (msg) => {
  console.log(`Message: ${msg}`);
  outputMessage(msg);
});

socket.on("join", (msg) => {
  console.log(msg);
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;
  socket.emit("sendMessage", msg);
});

function outputMessage(msg) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${msg}
    </p>`;

  document.querySelector('.chat-messages').appendChild(div);
}
