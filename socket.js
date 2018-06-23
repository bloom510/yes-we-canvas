//Socket.io configuration is a bit hard coded for now, can be made more versatile if needed
class Socket {
    constructor(server){
        try{
        //Create a new HTTP Server to run Socket.io
        this.server = require('http').Server(server); 
        //Use that server to run Socket.io
        this.io = require('socket.io')(this.server); 
        } catch(e) {
            console.log(e.stack)
        }
    }

}

module.exports = Socket;