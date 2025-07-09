const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
let dotenv = require("dotenv");
dotenv.config();

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Ink Sync Server");
});

let rooms = [];
const Port = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("joinRoom", (data) => {
    if (!data.roomId) {
      socket.emit("error", "Room ID is required");
      return;
    }

    console.log(`${socket.id} joined room ${data.roomId}`);
    socket.join(data.roomId);
    
    const room = rooms.find((r) => r.roomId === data.roomId);
    if (room) {
      // Update the new user with the current canvas
      socket.emit("updateCanvas", {
        updatedElements: room.updatedElements,
        canvasColor: room.canvasColor
      });
      room.users.push(socket.id);
    } else {
      rooms.push({
        roomId: data.roomId,
        updatedElements: [],
        users: [socket.id],
        canvasColor: "#121212"
      });
    }
  });

  socket.on("updateCanvas", (data) => {
    if (!data.roomId) {
      socket.emit("error", "Room ID is required");
      return;
    }

    const room = rooms.find((r) => r.roomId === data.roomId);
    if (room) {
      room.updatedElements = data.updatedElements || [];
      room.canvasColor = data.canvasColor || "#121212";
      socket.to(data.roomId).emit("updateCanvas", data);
    }
  });

  socket.on("sendMessage", (data) => {
    if (!data.roomId || !data.message) {
      socket.emit("error", "Room ID and message are required");
      return;
    }

    const messageData = {
      ...data,
      time: new Date().toLocaleTimeString()
    };
    io.to(data.roomId).emit("getMessage", messageData);
  });

  socket.on("pong", () => {
    setTimeout(() => {
      socket.emit("ping");
    }, 120000);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    rooms.forEach((room) => {
      room.users = room.users.filter((user) => user !== socket.id);
      if (room.users.length === 0) {
        rooms = rooms.filter((r) => r.roomId !== room.roomId);
      }
    });
  });
});

server.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});