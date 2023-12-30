import io from "./server.js";

io.on("connection", (socket) => {
  console.log("Connection established");
  socket.on("send", (value) => {
    socket.broadcast.emit("send:receive", value);
  });
});
