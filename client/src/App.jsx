import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Button, Container, TextField, Typography, Stack } from "@mui/material";

function App() {
  const socket = useMemo(() => {
    return io("http://localhost:4000");
  }, []);
  // const socket = io("http://localhost:4000");

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);

  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("Connected successfully ", socket.id);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });

    socket.on("receive-message", (s) => {
      setMessages((messages) => [...messages, s]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };

  const handleRoomSubmit = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  };

  // console.log(messages);

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" component="div" gutterBottom>
        {socketId}
      </Typography>

      <form onSubmit={handleRoomSubmit}>
        <h5>Join room</h5>
        <TextField
          id="outlined-basic"
          label="Room name"
          value={roomName}
          variant="outlined"
          onChange={(e) => setRoomName(e.target.value)}
        />

        <Button type="submit">Submit</Button>
      </form>

      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Message"
          value={message}
          variant="outlined"
          onChange={(e) => setMessage(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Room "
          value={room}
          variant="outlined"
          onChange={(e) => setRoom(e.target.value)}
        />

        <Button type="submit">Submit</Button>
      </form>

      <Stack>
        {messages.map((m, i) => (
          <Typography variant="h6" component="div" gutterBottom key={i}>
            {m}
          </Typography>
        ))}
      </Stack>
    </Container>
  );
}

export default App;
