function preload() {
	soundFormats('m4a', 'mp3', 'ogg')
	wind = loadSound("wind.mp3")
}

function setup() {
	createCanvas(600, 400);
	bb = loadImage("druppel.png");
	achtergrond = loadImage("achtergrond.jpg")
	emmer = loadImage("emmer.png")
	soundFormats('m4a', 'mp3', 'ogg')
	druppelgeluid = loadSound("druppelgeluid.mp3")
	player = new Emmer();
}

var screen = 0;
var y = -20;
var x = 200;
var speed = 2;
var score = 0;
var highscore = 0;
var achtergrond;
var druppels = [];

class Druppel {
	constructor(x, y, w, h) {
		this.x = random(width);
		this.y = 0;
		this.w = 30;
		this.h = 30;

		if (score > 5) {
			this.vy = 7;
		}
		if (score > 15) {
			this.vy = 9;
		}
		else {
			this.vy = 5;
		}
	}

	draw() {
		fill(0);
		image(bb, this.x, this.y, this.w, this.h);
		this.y += this.vy;

	}

	checkCollision() {
		if (player.y < this.y) {
			if (player.x + player.w > this.x && player.x < this.x + this.w) {
				druppelgeluid.play()
				score += 1
				if (score > highscore);
				highscore = score

				let idx = druppels.indexOf(this);
				druppels.splice(idx, 1);
			}
		}

		if (this.y > height) {
			screen = 2;
		}
	}

}

class Emmer {
	constructor() {
		this.x = 100;
		this.y = height - 40;
		this.w = 50;
		this.h = 50;
	}

	draw() {
		//rectMode(CENTER)
		this.x = mouseX;
		image(emmer, this.x, this.y, this.w, this.h);
	}
}

function draw() {
	if (screen == 0) {
		startScreen()
	} else if (screen == 1) {
		gameOn()
	} else if (screen == 2) {
		endScreen()
	}
}

function startScreen() {
	background("lightblue");
	fill(255);
	textAlign(CENTER);
	text('Welkom bij "Catching Balls"!', width / 2, height / 2)
	text('Klik op het scherm om het spel te beginnen', width / 2, height / 2 + 20);
	reset();
}

function gameOn() {
	background(achtergrond);
	fill(255);
	text("Score = " + score, 30, 20);
	text("Highscore = " + highscore, 42, 40);
	player.draw();

	if (frameCount % 100 == 0) {

		druppels.push(new Druppel());

	}
	if (frameCount % 100 == 50) {

		druppels.push(new Druppel());
	}

	druppels.forEach((b) => {
		b.draw();
		b.checkCollision();
	});

	this.y += speed;
}

function endScreen() {
	background(150);
	fill(250);
	textAlign(CENTER);
	text('GAME OVER', width / 2, height / 2);
	text("Je score is = " + score, width / 2, height / 2 + 20);
	text("Je highscore is = " + highscore, width / 2, height / 2 + 40)
	text('Opnieuw proberen?', width / 2, height / 2 + 60);
}

function mousePressed() {
	if (screen == 0) {
		screen = 1;
		wind.play()
	}
	else if (screen == 2) {
		druppels = [];
		screen = 0;
	}
}

function reset() {
	score = 0;
	speed = 2;
	y = -20;
}