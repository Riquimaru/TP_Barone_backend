

const socket = io();

let user = document.getElementById('user')
let input = document.getElementById('chat')
document.getElementById('btn').addEventListener('click', () => {
    socket.emit('message', user.value, input.value)
})


socket.on('messages', data =>{
    document.getElementById('msgs').innerText = data;
})
