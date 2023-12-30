const socket = io();
const input = document.querySelector("#editor-texto");

input.addEventListener("keyup", (event) => {
  const value = event.target.value;
  if (value) {
    socket.emit("send", value);
  }
});
socket.on("send:receive", (value) => {
  input.value = value;
});
