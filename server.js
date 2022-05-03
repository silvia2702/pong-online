const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,
  {
    cors: {
      origin: "http://172.16.102.99", 
      methods: ["GET", "POST"]
    }
  });

const cors = require("cors");
app.use(cors());

const users = {};

io.on('connection', (socket) => {
    console.log("NEW USER: ", socket.id);

    socket.on("new-user", (gameTag) => {
      users[gameTag]= socket.id;
      io.emit("new-player", users);
      })

      socket.on("draw-input", (draw) => {
        io.emit("draw-output", draw)
      })

      socket.on("disconnect", (reason) => handleDisconnect(socket, reason))

  });

  function handleDisconnect (socket, reason) {
    Object.entries(users).forEach(([key, value]) => {
      if(socket.id === value){
        delete users[key]
        console.log("USER:", key, "disconnected, reason:", reason)
      }
    })
  }

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
  
server.listen(3000, () => {
  console.log('listening on *:3000');
});