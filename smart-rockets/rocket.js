class Rocket {
    constructor(dna) {
        this.position = createVector(width/2,height);
        //this.velocity = createVector(0, -1);
        this.velocity = p5.Vector.random2D();
        this.acceleration = createVector();
        
        this.r = 6;
        
        //Counts the lifespan
        //this.count = 0;
        if(dna) {
            this.dna = dna;
        }
        else{
            this.dna = new Dna();
        }
        
        this.fitness = 0;
        
        this.completed = false;
        this.crashed = false;
    }
    
    calulateFitness(){
        //console.log(this.position);
        var d = dist(target.x, target.y, this.position.x, this.position.y);
        this.fitness = map(d, 0, width, width, 0); 
        
        if(this.crashed){
            if (this.position.y > height){
                this.fitness = 0;
            }
            //console.log("crashed", d);
        }
        if (this.completed) {
            console.log("completed", this, d);
            this.fitness *= 10;
        }
        
        if (this.crashed) {
            this.fitness /= 10;
        }
    }
    applyForce(force){
        this.acceleration.add(force);
    }
    
    update() {
        //console.log(target);
        var d = dist(target.x, target.y, this.position.x, this.position.y)
       
        //If the distance of the rocket from the target is less than 10, then consider it has reached the
        //target.
        if (d < 10){
            this.completed = true;
            this.position = target.copy();
            //this.position.x = target.x;
            //this.position.y = tar
            //console.log(this.position)
        }
        
        // Rocket hit the barrier
        if (this.position.x > rx && this.position.x < rx + rw && this.position.y > ry && this.position.y < ry + rh) {
            this.crashed = true;
        }
        
        if(this.position.x < 0 || this.position.x > width){
            this.crashed = true;
        }
        
        if(/*this.position.y < 0 ||*/ this.position.y > height) {
            this.crashed = true;
        }
        this.applyForce(this.dna.genes[age]);
        //this.count++;
        
        // The velocity accelaration gig
        if(!this.completed && !this.crashed){
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);

            this.acceleration.mult(0);
            this.velocity.limit(4);
        }
    }
    
    show() {
        var angle = this.velocity.heading() + PI/2;
        push();
        translate(this.position.x, this.position.y);
        rotate(angle);
        
        fill(0,0,255);
        noStroke();
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        pop();
    }
}
