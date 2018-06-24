
class Client {
    constructor(){
        this.socket = io.connect(window.location.host);
        this.activateListeners()
    }
    activateListeners(){
        this.socket.on('connect', () => { //when a server connection is established
            this.socket.emit('ready', 'hello from the client side!')
            this.socket.on('ready', (data) => console.log(data))
        });
    }
}

window.addEventListener('load', () => {
    const client = new Client();
})