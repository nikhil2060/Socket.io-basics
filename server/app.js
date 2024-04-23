import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected");
  console.log("Id", socket.id);

  // socket.broadcast.emit("welcome", `Welcome to the server ${socket.id} `);
  //sends message except itself2

  socket.on("message", (data) => {
    console.log(data);
    // socket.broadcast.emit("receive-message", data);
    io.to(data.room).emit("receive-message", data.message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
