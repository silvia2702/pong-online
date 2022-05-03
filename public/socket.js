const socket = io("http://172.16.102.99:3000");
const userDiv = document.getElementById("users");

socket.on("connect", () => {
    const username = window.prompt("username", "no_name");
    socket.emit("new-user", username);
})

socket.on("new-player", player => {
    removeAllChildNodes(userDiv);
    const users = Object.keys(player);
    for(let i = 0; i < users.length; i++) {
        const gameTag = document.createElement("h1")
        gameTag.innerHTML = users[i];
        userDiv.append(gameTag);
    }
    
})

socket.on("draw-output", (draw) => {
    linesArray = draw;
    redraw();
})

function sendDrawData(array) {
    socket.emit("draw-input", array)
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}