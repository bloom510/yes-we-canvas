//Socket.io configuration is a bit hard coded for now, can be made more versatile if needed
const Algorithms = require('../app/algorithms')
const Sprite = require('../app/sprite')

class Socket {
    constructor(app, PORT){
        this.server = require('http').createServer(app); 
        this.io = require('socket.io')(this.server) 
        this.sprites = [];
        this.init(PORT)
    }
    init(PORT){
        this.server.listen(PORT, () => {
            console.log(`app listening on port ${PORT}`)
            this.activateListeners()
        })
    }
    activateListeners(){
        this.io.on('connection', (socket) => { 

            socket.on('ready', (data) => {
                console.log(data)
                socket.emit('ready', 'hello from the server side!')
            })

            socket.on('xy', (data) => {
                // console.log(data.x, data.y)
                //create a new sprite
                let sprite = new Sprite(data.x, data.y, 50)
                
                //send it back
                socket.emit('sprite', {x: sprite.x, y: sprite.y, particles: sprite.particles, radius: sprite.radius})

                // socket.emit('sprite', new Sprite(this.context, window.mouse.x - 50, window.mouse.y, 50))
            })


        })
    }

}

module.exports = Socket;