const socket = io.connect(window.location.host);

socket.on('connect', () => { //when a server connection is established
    socket.emit('ready', 'hello from the client side!')
    socket.on('ready', (data) => console.log(data))
});