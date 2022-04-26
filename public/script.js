const socket = io();

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
    }
});

socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});


const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

let pos = {};
let mouseDown = false;
document.addEventListener("mousemove", e => {
    pos.x = e.clientX;
    pos.y = e.clientY;
    if(mouseDown){
        c.beginPath();
        draw()
    } else {
        c.closePath();
    }
})

document.addEventListener("mousedown", (e) => {
    console.log("mouse down")
    mouseDown = true});
document.addEventListener("mouseup", (e) => mouseDown = false);

function draw (){

    c.lineWidth = 5;
    c.lineCap = 'round';
    c.strokeStyle = '#c0392b';
    
    c.moveTo(pos.x, pos.y);
    
    c.lineTo(pos.x, pos.y);
    
    c.stroke();
}