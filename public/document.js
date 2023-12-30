const socket = io();
const input = document.querySelector("#editor-texto");
const documentTitle = document.querySelector("#titulo-documento");

const params = new URLSearchParams(window.location.search);
const pageTitle = params.get("nome");

documentTitle.textContent = pageTitle || "Documento sem título";

socket.emit("enter", pageTitle, (value) => {
    input.value = value;
})

input.addEventListener("keyup", (event) => {
  const value = event.target.value;
  if (value) {
    socket.emit("send", value, pageTitle);
  }
});
socket.on("send:receive", (value) => {
  input.value = value;
});


