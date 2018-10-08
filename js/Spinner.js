class Spinner{
		constructor(){
		this.r=(Math.random()*75)+75;
		this.angle=Math.random()*2*Math.PI;
		this.speed=(Math.random()*0.01)+0.02;
		this.color=COLORS[colorP][Math.round(Math.random()*COLORS.length)]
	}
	draw(){
		this.xpos=x+Math.sin(this.angle)*this.r;
		this.ypos=y+Math.cos(this.angle)*this.r;
		this.angle+=this.speed
		ctx.fillStyle=this.color;
		ctx.fillRect(this.xpos,this.ypos,5,5);
	}
}

function initializeSpinner() {
	x = canvas.width / 2;
	y = canvas.height / 2;
	spinners = [];
	mouseX = x, mouseY = y;
	COLORS = [["#0C0032", "#190061", "#240090", "#3500D3", "#282828"], ["#242582", "#553D67", "#F64C72", "#99738E", "#2F2FA2"], ["#0B0C10", "#1F2833", "#C5C6C7", "#66FCF1", "#45A29E"], ["#2C3531", "#116466", "#D9B08C", "#FFCB9A"], ["#61892F", "#86C232", "#222629", "#474B4F", "#6B6E70"], ["#5455B2", "#856D97", "#F64C72", "#C9A3BE", "#5F5FD2"]];
	colorP = Math.floor(Math.random() * COLORS.length);
	for (var i = 0; i < 35; i++) {
		spinners[i] = new Spinner();
	}
	ctx.fillStyle="black";
	ctx.fillRect(0,0,canvas.width,canvas.height)

}

function drawSpinner(){	
	requestID=undefined;
	ctx.fillStyle="rgba(0,0,0,0.1)";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	for (var i = 0; i < spinners.length; i++) {
		spinners[i].draw();
	}
	x+=(mouseX-x) *0.025;
	y+=(mouseY-y) *0.025;
	startSpinner();
}
function startSpinner(){
	if (!requestID)
		requestID=window.requestAnimationFrame(drawSpinner);
}