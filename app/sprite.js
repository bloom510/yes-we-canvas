class Sprite { 
    constructor(x, y, radius){
        //Location of our sprite
        this.x = x;
        this.y = y;

        //Particles that make up the sprite, if any. Each has their own XY coordinates.
        this.particles = [];
        
        //Circle stuff. Consider namespacing in its own object
        this.radius = 50;
        this.diameter = 100;

        //A classic particle. I like to think of them as nodes
        this.particle = function(x, y, radius){
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

        this.createPolarSpace(this.radius)
    }

    //draws an enclosing box around our circle
    createContainer(radius){
        const diameter = radius * 2;
        this.container.width = diameter * 2;
        this.container.height = diameter * 2;
        this.container.startX = window.mouse.x - diameter;
        this.container.startY = window.mouse.y - diameter;
        
    }


    //Unleashes a specified number of particles acting as nodes of connectivity into polar space
    createPolarSpace(radius){
        //Omitting the deletion of previous data from vertices array (below) makes some cool paintbrush effects
        this.particles = [];

        this.x = this.x - this.radius;
        // this.y = window.mouse.y; 

        for (let i = 0; i < 360; i++) {
            let interval = (Math.PI * 2) / 12;
            let radianAngle = interval * (i + 9);
      
            let x = Math.round(this.x + this.radius * Math.cos(radianAngle));
            let y = Math.round(this.y + this.radius * Math.sin(radianAngle));
      
            let node = new this.particle(x, y, radius)
            this.radius = radius;
            this.particles.push(node);
          }

        //   this.createContainer(this.radius) //input mouse coords instead of radius
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

module.exports = Sprite;