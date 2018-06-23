const socket = io.connect(window.location.host);

socket.on('connect', (data) => {
    console.log('hello from server')
    socket.emit('connection')
});