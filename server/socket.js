//Socket.io configuration is a bit hard coded for now, can be made more versatile if needed
class Socket {
    constructor(app, PORT){
        try{
        //Create a new HTTP Server to run Socket.io
        this.server = require('http').createServer(app); 
        //Use that server to run Socket.io
        this.io = require('socket.io')(this.server) 

        this.server.listen(PORT, () => {
            console.log(`app listening on port ${PORT}`)
            this.io.emit('connect');
            this.io.on('connection', () => {
                console.log('client connected')
                //event handlers go here
            })

          })

        } catch(e) {
            console.log(e.stack)
        }
    }

}

module.exports = Socket;