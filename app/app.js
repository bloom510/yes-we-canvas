class Canvas {
    constructor(width, height, socket) {
        this.global = {}; 
        this.width = width;
        this.height = height;
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
       
        //Setup
        const setup = () => {
            this.context = canvas.getContext('2d');
            this.context.strokeStyle = params.strokeStyle;
            this.context.fillStyle = params.fillStyle;
            this.context.lineCap = params.lineCap;
            this.context.lineWidth = params.lineWidth;
        }
        
        const setBg = () => {
            this.context.fillRect(0, 0, this.width, this.height);
        }
        // this.getMousePos();
    }

    //Cartesian distance formula
    getDistance(x1, y1, x2, y2) {
        return Math.abs(Math.sqrt(Math.pow(x2 - x1, 2) - Math.pow(y2 - y1, 2)));
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
            this.dummyFunc()
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
               let scale = this.getDistance(this.mouse.prevX, this.mouse.prevY, x, y);
               if(this.global.shape) this.global.shape.updateRadius(scale)

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

    //Dummy function to test n-gon generator / sprite system
    dummyFunc(x, y){
        this.global.shape = new Shape(this.context, window.mouse.x - 50, window.mouse.y, 50)
    }

}

module.exports = Canvas;

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
    
          