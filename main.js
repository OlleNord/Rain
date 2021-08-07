const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
let started = false;
window.addEventListener("keydown", function(e) {
    if (!started) {
        start();
        started = true;
    }

    if (e.key == "a" && player.x > 0) {
        player.x -= grid;
    }

    if (e.key == "d" && player.x < grid*18-grid) {
        player.x += grid;
    }
    
});
window.addEventListener("resize", function(e) {
    this.location = location;
    
});
let grid;
if (16 * 18 < window.innerWidth) {
    grid = 16;
}
if (32 * 18 < window.innerWidth) {
    grid = 32;
}
if (64 * 18 < window.innerWidth) {
    grid = 64;
}

canvas.width = grid*18;
canvas.height = grid*12;
let frames = 0;
let points = 0;
let lives = 3;
let fSize = grid*2
ctx.font = fSize + "px sans-serif";
ctx.fillStyle = "blue";
ctx.fillText("RAIN", canvas.width/2-fSize*1.25, canvas.height/2-fSize/2);
ctx.font = fSize*0.175 + "px sans-serif";
ctx.fillText("Press any key to continue...", canvas.width/2-fSize*1.20, canvas.height/2-fSize*0.30);

let player = {
    x: canvas.width/2-grid,
    y: canvas.height-grid*2,
};
let rainDrops = new Array();
class Rain {
    constructor() {
        this.x = (Math.round(Math.random() * 18))*grid;
        this.y = -grid;
    }
    draw() {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, grid, grid);
    }
    update() {
        if (frames % 100 == 0) {
            this.y += grid;
        }
        
    }
}




function draw() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // RainDrops
    for (let i = 0; i < rainDrops.length; i++) {
        rainDrops[i].draw();
    }

    // Player
    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, grid, grid);
    text();
    if (lives < 1) return
    requestAnimationFrame(draw);
}
function update() {
    if (lives < 1) {
        for (let i = 0; i < rainDrops.length; i++) {
            rainDrops.splice(i, 1);
        }
        return;
    }
    for (let i = 0; i < rainDrops.length; i++) {
        if (player.x == rainDrops[i].x && player.y == rainDrops[i].y) {
            rainDrops.splice(i, 1);
            points++;
        }
        if (rainDrops[i].y > grid*11) {
            rainDrops.splice(i, 1);
            lives--;
        }
        rainDrops[i].update();
    }
    requestAnimationFrame(update);
    frames++;
}
function start() {
    requestAnimationFrame(update);
    nrd = setInterval("newRaindrop()", 500);
    requestAnimationFrame(draw);
    for (let i = 0; i < 1; i++) {
        rainDrops[i] = new Rain();
    }
}

function newRaindrop() {
    if (lives < 1) return
    rainDrops.push(new Rain());
}

function text() {
    ctx.fillStyle = "blue"
    ctx.font = fSize/3 + "px sans-serif";
    ctx.fillText("Points: " + points, fSize*0.33, fSize*0.5);
    ctx.fillText("Lives: " + lives, fSize*0.33, fSize*0.78);
}
