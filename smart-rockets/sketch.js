//let rockets = [];
var popSize = 25;
var lifeSpan = 300;
var age = 0;
var population;
var lifeP;
var target;
var maxForce = 0.2;

var rx = 200;
var ry = 300;
var rw = 200;
var rh = 10;

function setup() {
	//createCanvas(windowWidth, windowHeight - 50);
	createCanvas(600, 500);
    background(0);
    target = createVector(width/2, 150);
    console.log(target.x, target.y);
    lifeP = createP();
    population = new Population();
}

function draw() {
    background(0);
    ellipse(target.x, target.y, 16);
    population.run();
    lifeP.html(age);
    
    age++;
    if(age == lifeSpan) {
        population.evaluate();
        population.selection();
        //population = new Population();
        age = 0;
    }
    
    // Renders barrier for rockets
    fill(255);
    rect(rx, ry, rw, rh);
    // Renders target
    //ellipse(target.x, target.y, 16, 16);
}

