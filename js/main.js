var nav=document.getElementById('nav');
var section=document.getElementById('section');
var stopButton=document.getElementById('bottom-button');
var footer=document.getElementById('footer');
var current, x, y, ctx, canvas, spinners, particles, mouseX, mouseY , mousedown, requestID;
fade(stopButton);

window.onresize=function(){
	if(current)
		background(current);
	canvas.width = window.innerWidth+1;
	canvas.height = window.innerHeight+1;
}
window.onload=function() {
	canvas = document.getElementById('canv');
	canvas.width = window.innerWidth+1;
	canvas.height = window.innerHeight+1;
	canvas.style.display="";
	ctx = canvas.getContext('2d');
	canvas.addEventListener("mousemove", function (event) {
		mouseX = event.clientX;
		mouseY = event.clientY;
	});
	canvas.addEventListener("mousedown", function () {
		mouseX = event.clientX;
		mouseY = event.clientY;
		mousedown = true;
	});
	canvas.addEventListener("mouseup", function () {
		mousedown = false;
	});
	canvas.addEventListener("touchstart", function () {
		mouseX = event.changedTouches[0].clientX;
		mouseY = event.changedTouches[0].clientY;
		mousedown = true;
	});
	window.addEventListener("touchmove", function (event) {
		mouseX = event.changedTouches[0].clientX;
		mouseY = event.changedTouches[0].clientY;
		mousedown = true;
	});
	canvas.addEventListener("touchend", function () {
		mousedown = false;
	});
}
function background(back) {
	current=back;
	fade(nav);
	fade(section);
	fade(footer);
	unfade(stopButton);
	canvas.style.display='';
	ctx.fillStyle="rgba(0,0,0,0)";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	switch (back) {
		case 'Spinner':
			initializeSpinner();
			startSpinner();
			break;
		case 'Particles':
			initializeParticle()
			startParticles();
			break;
		case 'default':
			drawDefault();
			break;
		default:
			break;
	}    
}

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -=  0.1;
    }, 50);
}
function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op +=  0.1;
    }, 50);
}

function stopAnimations() {
	if(ctx){
		ctx.fillStyle="rgba(255,255,255,0)";
		ctx.fillRect(0,0,canvas.width,canvas.height);
		canvas.style.display="none";
	}
	unfade(nav);
	unfade(section);
	unfade(footer);
	fade(stopButton);
	current=undefined;
	if (requestID){
		window.cancelAnimationFrame(requestID);
		requestID=undefined;
	}
}