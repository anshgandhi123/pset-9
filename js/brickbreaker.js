const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let winCount = document.getElementById("headers")
let speed;
ctx.strokeStyle = "lightgreen";
let changeInSpeed;
let start = false;
let blocks = [];
let countsWins = 0;
const victoryAudio = document.getElementById("victoryAudio");
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
  victoryAudio.pause();
  victoryAudio.currentTime = 0
    bounce.x = canvas.width / 2;
    bounce.y = canvas.height - 20;
    bounce.right = true;
    bounce.up = true;
    user.x = (canvas.width / 2) - 40;
    user.y = canvas.height - 10;
    changeInSpeed = 1;
    speed = 0;
    blocks = [];
    createblocks();
    start = true;
}

function game() {
    if (start) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        crash();
        directionChange();
        if (blocks.length === 0) {
            win();
        }
    }
    setTimeout(game, 20 - speed);
}
function directionChange() {
    if (bounce.right) {
        speed = 3 * changeInSpeed;
    }
    else {
        speed = -3 * changeInSpeed;
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
function crash() {
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

    for (let j = 0; j < blocks.length; j++) {
        if (bounce.y - bounce.radius <= blocks[j].y + blocks[j].height && bounce.y - bounce.radius > blocks[j].y + blocks[j].height - 5 && bounce.x >= blocks[j].x - bounce.radius && bounce.x < blocks[j].x + blocks[j].width + bounce.radius) {
            bounce.up = false;
            ctx.clearRect(blocks[j].x, blocks[j].y, blocks[j].width, blocks[j].height);
            blocks.splice(j, 1);
            break;
        }
        else if (!bounce.up && bounce.y + bounce.radius >= blocks[j].y && bounce.y + bounce.radius < blocks[j].y + 12 && bounce.x >= blocks[j].x - bounce.radius && bounce.x < blocks[j].x + blocks[j].width + bounce.radius) {
          bounce.up = true;
          ctx.clearRect(blocks[j].x, blocks[j].y, blocks[j].width, blocks[j].height);
          blocks.splice(j, 1);
          break;
        }
        else if (bounce.x + bounce.radius >= blocks[j].x && bounce.x + bounce.radius < blocks[j].x + 10 && bounce.y >= blocks[j].y - bounce.radius && bounce.y < blocks[j].y + blocks[j].height + bounce.radius) {
            bounce.right = false;
            ctx.clearRect(blocks[j].x, blocks[j].y, blocks[j].width, blocks[j].height);
            blocks.splice(j, 1);
            break;
        }
        else if (bounce.x - bounce.radius <= blocks[j].x + blocks[j].width && bounce.x - bounce.radius > blocks[j].x + blocks[j].width - 10 && bounce.y >= blocks[j].y - bounce.radius && bounce.y < blocks[j].y + blocks[j].height + bounce.radius) {
            bounce.right = true;
            ctx.clearRect(blocks[j].x, blocks[j].y, blocks[j].width, blocks[j].height);
            blocks.splice(j, 1);
            break;
        }
    }

    if (bounce.y + bounce.radius == user.y) {
        let a = 3;
        const changeInSpeed_change = a / 25;
        for (let i = 2; i <= 100; i += 2) {
            if (bounce.x >= user.x - bounce.radius + i - 2 && bounce.x < user.x - bounce.radius + i) {
                if (i < 50) {
                    bounce.up = true;
                    bounce.right = false;
                    speed = (speed >= 11) ? speed = 11 : speed + 0.5;
                    changeInSpeed = Math.abs(a);
                }
                else if (i >= 50) {
                    bounce.up = true;
                    bounce.right = true;
                    speed = (speed >= 11) ? speed = 11 : speed + 0.5;
                    changeInSpeed = Math.abs(a);
                }
                break;
            }
            else {
                a -= changeInSpeed_change;
            }
        }
    }

    if (user.x + user.width > canvas.width) {
        user.movement = 0;
        user.x = canvas.width - user.width;
    }
    else if (user.x < 0) {
        user.movement = 0;
        user.x = 0;
    }
    else {
        user.movement = 20;
    }
}
function draw() {
    ctx.strokeRect(user.x, user.y, user.width, user.height);
    ctx.beginPath();
    ctx.arc(bounce.x, bounce.y, bounce.radius, 0, Math.PI * 2);
    ctx.stroke();
    for (let i = 0; i < blocks.length; i++) {
        ctx.strokeRect(blocks[i].x, blocks[i].y, blocks[i].width, blocks[i].height);
    }
}
function getArrowKeys(event) {
    if (start) {
        if (event.keyCode == 37) {
            moveuser(-1 * user.movement);
        }
        else if (event.keyCode == 39) {
            moveuser(user.movement);
        }
    }
}
function moveuser(pixels) {
    user.x += pixels;
}
function createblocks() {
    for (let y = 0; y <= 80; y += 40) {
        for (let x = 0; x < canvas.width; x += canvas.width / 10) {
            let boxes = {
                x: x,
                y: y,
                width: canvas.width / 10,
                height: 40
            };
            blocks.push(boxes);
        }
    }
}
function lose() {
    init();
}
function win() {
  victoryAudio.play();
  start = false;
  countsWins++
  winCount.innerHTML = countsWins + ""
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2.5;
  ctx.textAlign = "center";
  ctx.font = "48px Times New Roman";
  ctx.fillText("You Win!", canvas.width/2, (canvas.height/2) - 40);

}
