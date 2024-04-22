import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("User connected");
  console.log("Id", socket.id);
});

const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
