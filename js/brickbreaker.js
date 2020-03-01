const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let speed;
ctx.strokeStyle = "lightgreen";
let changeSpeed;
let start = false;
let blocks = [];
let countingforWins = 0;
let user = {
    x: (canvas.width / 2) - 40,
    y: canvas.height - 10,
    width: 80,
    height: 5,
    movement: 20
};

let bounce = {
    x: undefined,
    y: undefined,
    radius: 10,
    right: true,
    up: true
};
window.onload = function() {
    document.getElementById("reset-button").onclick = init;
    document.getElementById("game").onclick = init;
    game();
}
document.addEventListener("keydown", getArrowKeys);
function init() {
    bounce.x = canvas.width / 2;
    bounce.y = canvas.height - 20;
    bounce.right = true;
    bounce.up = true;
    user.x = (canvas.width / 2) - 40;
    user.y = canvas.height - 10;
    changeSpeed = 1;
    speed = 0;
    blocks = [];
    createblocks();
    start = true;
}

function game() {
    if (start) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        checkCollision();
        movementInDirection();
        if (blocks.length === 0) {
            win();
        }
    }
    setTimeout(game, 20 - speed);
}
function movementInDirection() {
    if (bounce.right) {
        speed = 3 * changeSpeed;
    }
    else {
        speed = -3 * changeSpeed;
    }
    if (bounce.left) {
        speed = 3 * changeSpeed;
    }
    else {
        speed = -3 * changeSpeed;
    }
    if (bounce.up) {
        verticalSpeed = -3;
    }
    else {
        verticalSpeed = 3;
    }
    bounce.x += speed;
    bounce.y += verticalSpeed;
}
function checkCollision() {
    if (bounce.x - bounce.radius <= 0) {
        bounce.right = true;
    }
    if (bounce.x + bounce.radius >= canvas.width) {
        bounce.right = false;
    }
    if (bounce.y - bounce.radius <= 0) {
        bounce.up = false;
    }
    if (bounce.y - bounce.radius >= canvas.height) {
        lose();
    }

  
