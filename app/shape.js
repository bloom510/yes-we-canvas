
//Think of clearer namespaces for this object. 
// Ideas: 
class Shape { 
    constructor(context, x, y, radius, name){
        this.context = context;
        this.canvas = canvas;
        this.name = name;

        //Location of our sprite
        this.x = x;
        this.y = y;

        //Vertices that make up the sprite, if any. Each has their own XY coordinates.
        this.vertices = [];
        
        //Circle stuff. Consider namespacing in its own object
        this.radius = 50;
        this.diameter = 100;

        //A classic particle. I like to think of them as nodes
        this.node = function(x, y, radius){
                this.radius = radius;
                this.diameter = 2*this.radius;
                this.x = x;
                this.y = y;
            };

        //A visual cue for the UI, object represents a rectangle enclosing our sprite
        this.container = {
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            startX: 0,
            startY: 0
        }
    }

    //draws an enclosing box around our circle
    createContainer(radius){
        const diameter = radius * 2;
        this.container.width = diameter * 2;
        this.container.height = diameter * 2;
        this.container.startX = window.mouse.x - diameter;
        this.container.startY = window.mouse.y - diameter;

        this.context.beginPath();
        this.context.strokeRect(this.container.startX, this.container.startY, diameter, diameter);
        this.context.stroke();
        this.context.closePath();
    }


    //Unleashes a specified number of particles acting as nodes of connectivity into polar space
    createPolarSpace(radius){
        //Omitting the deletion of previous data from vertices array (below) makes some cool paintbrush effects
        this.vertices = [];

        this.x = window.mouse.x - this.radius;
        this.y = window.mouse.y; 

        for (let i = 0; i < 360; i++) {
            let interval = (Math.PI * 2) / 12;
            let radianAngle = interval * (i + 9);
      
            let x = Math.round(this.x + this.radius * Math.cos(radianAngle));
            let y = Math.round(this.y + this.radius * Math.sin(radianAngle));
      
            let node = new this.node(x, y, radius)
            this.radius = radius;
            this.vertices.push(node);
          }

          for(let j = 0; j < this.vertices.length; j++){
            this.plotDot(this.vertices[j].x, this.vertices[j].y);
          }

          this.createContainer(this.radius) //input mouse coords instead of radius
    }

    updateRadius(radius){ 
        const clearPrevious = (coords) => {
            this.context.beginPath();
            this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
            this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);
            this.context.fill()   
            this.context.closePath();
        }

        const update = (coords) => {       
            this.context.strokeStyle = 'white'
            this.radius = radius;
            this.createPolarSpace(radius)

        }

        clearPrevious()
        update()
    }

    plotDot(x, y) {
        this.context.beginPath();
        this.context.arc(x, y - this.radius, 1, 0, Math.PI * 2); //mouse
        this.context.stroke();
        this.context.closePath();
      }

    //A simple centroid finder algorithm. Should be tested on a variety of polygons to determine algorithm choice
    computeCentroid(vertices){
        let sumX = 0, sumY = 0, i = 0;
        for(i; i < vertices.length; i++){
            sumX += vertices[i].x;
            sumY += vertices[i].y;
        }
        const C = { x: sumX / vertices.length, y: sumY / vertices.length };
        return C;    
    }

    ngon(){
        console.log('n-gon generator goes here')
    }
 

}