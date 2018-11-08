class Population {
    constructor () {
        this.popSize = popSize;
        this.rockets = [];
        
        this.matingpool = [];
        
        for(var i = 0; i < this.popSize; i++){
            this.rockets[i] = new Rocket();
            //this.rockets[i] = new Rocket(random(width), random(height));
        }
    }
    
    evaluate(){
        var maxfit = 0;
        
        for(var i = 0; i < this.popSize; i++){
            this.rockets[i].calulateFitness();
            
            if (this.rockets[i].fitness > maxfit){
                maxfit = this.rockets[i].fitness;
            }
        }
        
        for(var i = 0; i < this.popSize; i++){
            this.rockets[i].fitness /= maxfit;
        }
        
        this.matingpool = [];
        
        for(var i = 0; i < this.popSize; i++) {
            var n = this.rockets[i].fitness * 100;
            for(var j = 0; j < n; j++){
                console.log(n);
                this.matingpool.push(this.rockets[i]);
            }
        }
        console.log(this.matingpool);
    }
    
    selection() {
        var newRockets = [];
        for(var i = 0; i < this.rockets.length; i++){
            var parentA = random(this.matingpool).dna;
            var parentB = random(this.matingpool).dna;
            
            var child = parentA.crossOver(parentB);
            child.mutation();
            
            newRockets[i] = new Rocket(child);
        }
        
        this.rockets = newRockets;
    }
    
    run() {
        for(var i = 0; i < this.popSize; i++) {
            this.rockets[i].update();
            this.rockets[i].show();
        }
    }
    
}
