//Socket.io configuration is a bit hard coded for now, can be made more versatile if needed
class Socket {
    constructor(app, PORT){
        //Create a new HTTP Server to run Socket.io
        this.server = require('http').createServer(app); 
        //Use that server to run Socket.io
        this.io = require('socket.io')(this.server) 

        this.server.listen(
            PORT,
                () => {
                console.log(`app listening on port ${PORT}`)
                this.io.on('connection', (socket) => { 
                    socket.on('ready', (data) => {
                    socket.emit('ready', 'hello from the server side!')
                    console.log(data)
                })
            })
        })
    }

}

module.exports = Socket;