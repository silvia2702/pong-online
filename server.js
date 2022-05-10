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

const TIME_LIMIT = 60
const users = {};
const queue = [];

let timer = TIME_LIMIT
let currentRound = 0
let word = ""
let interval


io.on('connection', (socket) => {
    console.log("NEW USER: ", socket.id);

    socket.on("new-user", (gameTag) => {
      users[gameTag]= socket.id;
      queue.push(gameTag)
      if(nextInQueue(gameTag))io.to(users[username]).emit("choose-word")
      io.emit("new-player", users)
    })



      socket.on("draw-input", (draw) => {
        io.emit("draw-output", draw)
      })

      socket.on("start-game", (w) => {
        word = w
        interval = startTimer()
      })

      socket.on("disconnect", (reason) => handleDisconnect(socket, reason))

      function startTimer() {
        return setInterval(()=>{
          time--

          if(timer > 0){
          io.emit("timer", time)
          }else {
            clearInterval(interval)
            io.emit("times-up")
            queue.forEach(player => {
              if(nextInQueue(player)) io.to(users[player]).emit("choose-word")
            })
          }
            
          
        })
      }

  });

  function handleDisconnect (socket, reason) {
    Object.entries(users).forEach(([key, value]) => {
      if(socket.id === value){
        delete users[key]
        console.log("USER:", key, "disconnected, reason:", reason)
      }
    })
  }

  function nextInQueue (user){
    if(queue[currentRound % queue.legnth] ===user) true
    else return false
  }

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
  
server.listen(3000, () => {
  console.log('listening on *:3000');
});