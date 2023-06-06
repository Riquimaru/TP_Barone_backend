const socket = io();

const desc = document.getElementsById('description');
const price = document.getElementsById('price')
document.querySelector('button').addEventListener('click', () => {
    socket.emit('add', desc.value)
    console.log(desc.value)
    console.log(price.value)
})

socket.on('show', data => {
    console.log(data)
    document.getElementById('newp').innerText = data;
})