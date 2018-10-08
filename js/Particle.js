class Particle{
	constructor(x,y){
		this.x=x;
		this.y=y;
		this.vX=0;
		this.vY=-0;
		this.pull=0;
		this.color="hsl("+Math.random()*360+",100%,60%)";
	}
	draw(){
		this.update();
		ctx.fillStyle=this.color;
		ctx.fillRect(this.x,this.y,5,5);
	}
	update(){
		this.pull=(Math.sqrt(Math.pow((mouseX-this.x),2)+Math.pow((mouseY-this.y),2)))*0.001;
		this.vY+=gravity;
		if(mousedown){
			this.x>mouseX? 	this.vX-=this.pull 	: 	this.vX+=this.pull;
			this.y>mouseY? 	this.vY-=this.pull 	: 	this.vY+=this.pull;
		}
		this.x+=this.vX;
		this.y+=this.vY;
		if(this.x<0)	this.vX*=-1;
		if(this.x>canvas.width-3)	{this.x=canvas.width-3.2; this.vY*=0.9; this.vX*=-0.995; }
		if(this.y<0)	this.vY*=-1;
		if(this.y>canvas.height-3)	{this.y=canvas.height-3.2; this.vY*=-0.9; this.vX*=0.995; }
    
        this.vX*=0.99;
		this.vY*=0.99;
	}
}

function initializeParticle() {
    particles = [];
    gravity = 0.03;
    for (var i = 0; i < 400; i++) {
        particles.push(new Particle(Math.random() * (canvas.width - 3), Math.random() * (canvas.height - 3)));
    }
    ctx.fillStyle="black";
	ctx.fillRect(0,0,canvas.width,canvas.height)

}

function drawParticles() {
    requestID=undefined;
	ctx.fillStyle="rgba(0,0,0,0.4)"
	ctx.fillRect(0,0,canvas.width,canvas.height)

	for (var i = 0; i < particles.length; i++)
		particles[i].draw();
    startParticles();
}
function startParticles(){
	if (!requestID)
		requestID=window.requestAnimationFrame(drawParticles);
}