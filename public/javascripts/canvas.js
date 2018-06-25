class Canvas {
    constructor(width, height, client) {
        this.global = {}; 
        this.width = width;
        this.height = height;
        this.client = client;
        this.mouse = {
                down: false,
                prevX: 0,
                prevY: 0,
                x: 0,
                y: 0
            }
        this.context, this.namespace;
        this.init({
                        strokeStyle: 'white',
                        fillStyle: 'black',
                        lineCap: 'round',
                        lineWidth: '1'
                    }); 
  
    }

    init(params){

        /*
        TODO:
        1. Move all DOM and canvas related operations to the client.js
        2. Retain all computation on the server in algorithms.js (rename this file)
        3. Socket flow is as follows: 
            Client ----------> Server ----------> Client
            getMousePos() ---> anAlgorithm() ---> draw()
        */
        
        //Create a canvas
        const createCanvas = () => {
            const canvas = document.createElement('canvas');
            canvas.id = 'canvas';
            canvas.width = this.width;
            canvas.height = this.height;
            document.body.appendChild(canvas);
        }

        createCanvas();
       
        //Setup
        const setup = (params) => {
            this.context = canvas.getContext('2d');
            this.context.strokeStyle = params.strokeStyle;
            this.context.fillStyle = params.fillStyle;
            this.context.lineCap = params.lineCap;
            this.context.lineWidth = params.lineWidth;
        }

        setup(params)
        
        const setBg = () => {
            this.context.fillRect(0, 0, this.width, this.height);
        }

        setBg();
        this.getMousePos();
    }

    drawContainer(){
        this.context.beginPath();
        this.context.strokeRect(this.container.startX, this.container.startY, diameter, diameter);
        this.context.stroke();
        this.context.closePath();
    }

    plotDot(x, y, particles, radius) {
          for(let j = 0; j < particles.length; j++){
            this.context.beginPath();
            this.context.arc(particles[j].x, particles[j].y - radius, 1, 0, Math.PI * 2); //mouse
            this.context.stroke();
            this.context.closePath();
          }
      }

 
    getMousePos(){
        const canvas = document.getElementById('canvas')
        const rect = canvas.getBoundingClientRect();
        let x, y;

        window.mouse = this.mouse;
        
        canvas.addEventListener('mousedown', (e) => {
            this.mouse.down = true;
            this.mouse.prevX = x;
            this.mouse.prevY = y;
            this.context.moveTo(x, y)
            
        });

        canvas.addEventListener('mouseup', () => {
            this.mouse.down = false;
        })

        canvas.addEventListener('mousemove', (e) => {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            this.mouse.x = x;
            this.mouse.y = y;       
            if(this.mouse.down){
            //    let scale = this.getDistance(this.mouse.prevX, this.mouse.prevY, x, y);
            //    if(this.global.shape) this.global.shape.updateRadius(scale)
               this.dummyFunc(this.mouse.x, this.mouse.y)  
                //TODO: have getMousePos consume an action as an argument to perform
                //      a variety of drawing operations.
                //
                // this.paint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }
            
        });
    }

    //Draw freehand with the mouse
    paint(coords){
        this.context.lineTo(coords.x, coords.y)
        this.context.stroke()
    }

    //Cartesian distance formula
    getDistance(x1, y1, x2, y2) {
        return Math.abs(Math.sqrt(Math.pow(x2 - x1, 2) - Math.pow(y2 - y1, 2)));
    }


    //Dummy function to test n-gon generator / sprite system
    //emits mouse xy coords
    dummyFunc(x, y){ 
        //1. Emit xy coordinates to the server
        this.client.socket.emit('xy', { x, y })
        //2. Receive back a new Sprite
        this.client.socket.on('sprite', (sprite) => {
            this.plotDot(sprite.x, sprite.y, sprite.particles, sprite.radius);
            
        })
        //3. draw the Sprite
      

        // this.global.sprite = new Sprite(this.context, window.mouse.x - 50, window.mouse.y, 50)
    }

}

//onLoad, instantiate a new Canvas and initialize it.
// window.addEventListener('load', () => {
//     const canvas = new Canvas(window.innerWidth, window.innerHeight);
//     canvas.init({
//             strokeStyle: 'white',
//             fillStyle: 'black',
//             lineCap: 'round',
//             lineWidth: '1'
//         }); 
// });
    
          