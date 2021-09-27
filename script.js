function setup() {
	createCanvas(600, 400);
}

var screen = 0;
var y=-20;
var x=200;
var speed = 2;
var score = 0;
var highscore = 0;

function draw() {
	if(screen == 0){
    startScreen()
  }else if(screen == 1){
  	gameOn()
  }else if(screen==2){
  	endScreen()
  }	
}

function startScreen(){
		background("lightblue");
		fill(255);
		textAlign(CENTER);
		text('Welkom bij "Catching Balls"!', width / 2, height / 2)
		text('Klik op het scherm om het spel te beginnen', width / 2, height / 2 + 20);
		reset();
}

function gameOn(){
		background(0);
		text("Score = " + score, 30,20);
		text("Highscore = " + highscore, 42,40);
		fill(255);
  	ellipse(x,y,20,20);
		rectMode(CENTER)
  	rect(mouseX,height-10,50,30)
			y+= speed;
  	if(y>height){
  	screen = 2
	 }
	  if(y>height-10 && x>mouseX-20 && x<mouseX+20){
  	y=-20
    speed+=.5
    score+= 1
  }
	if(y==-20){
  	pickRandom();
  }
}

function pickRandom(){
	x= random(20,width-20)
}

function endScreen(){
		background(150);
		textAlign(CENTER);
		text('GAME OVER', width / 2, height / 2);
  	text("YOUR SCORE = " + score, width / 2, height / 2 + 20);
		text('Opnieuw proberen?', width / 2, height / 2 + 40);
}

function mousePressed(){
	if(screen==0){
  	screen=1
  }else if(screen==2){
  	screen=0
  }
}

function reset(){
	  score=0;
  	speed=2;
  	y=-20;
}
