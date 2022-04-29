const socket = io("http://localhost:3000");

socket.on("connect", () => {
    const username = prompt("username", "no_name");
    socket.emit("new-user", username);
})