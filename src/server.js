import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";
const app = express();

const currentPath = url.fileURLToPath(import.meta.url);
const publicDirectory = path.join(currentPath, "..", "..", "public");

app.use(express.static(publicDirectory));

const httpServer = http.createServer(app);

httpServer.listen(3000, () => console.log("Server listening on port 3000"));

const socket = new Server(httpServer);

socket.on("connection", (socket) => {
  console.log("Connection established");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
