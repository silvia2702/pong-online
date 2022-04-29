const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require("cors");
app.use(cors());

const users = {};

io.on('connection', (socket) => {
    console.log("NEW USER: ", socket.id);

    socket.on("new-user", (gameTag) => {
      users[gameTag]= socket.id;
      io.emit("new-player", users);
    })
});

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
  
server.listen(3000, () => {
  console.log('listening on *:3000');
});