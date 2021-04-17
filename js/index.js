const canvas = document.querySelector('canvas');

canvas.width = 1200;
canvas.height = 800;
const ctx = canvas.getContext('2d');
const box = new Box(15, 20, 15);
const snakeBody = [];
let score = 0;

let xUpdate = 0;
let yUpdate = 0;
let movement = 5;


snakeBody.push(box);
console.log(snakeBody);
let food = generateFood();


function getHead() {
    return snakeBody[snakeBody.length - 1];
}

function isCollidedWithWalls() {
    if (getHead().xPos < 10 || getHead().xPos > canvas.width - getHead().size - movement) {
        return true;
    }

    if (getHead().yPos < 10 || getHead().yPos > canvas.height - getHead().size - movement) {
        return true;
    }
}

function generateFood() {
    let xPos = Math.floor(Math.random() * canvas.width - 20) + 10;
    let yPos = Math.floor(Math.random() * canvas.height - 20) + 10;
    return new Box(xPos, yPos, 10, 'red');
}

function isCollidedWithFood() {
    let distance = Math.sqrt((box.xPos - food.xPos) * (box.xPos - food.xPos) + (box.yPos - food.yPos) * (box.yPos - food.yPos));
    if (distance < (box.size + food.size)) {
        return true;
    }

    return false;
}

document.addEventListener('keyup', (e) => {
    switch (e.code) {
        case 'ArrowUp':
            if (yUpdate === 0) {
                xUpdate = 0;
                yUpdate = -movement;
            }
            break;
        case 'ArrowDown':
            if (yUpdate === 0) {
                xUpdate = 0;
                yUpdate = movement;
            }
            break;
        case 'ArrowLeft':
            if (xUpdate === 0) {
                xUpdate = -movement; yUpdate = 0;
            }
            break;
        case 'ArrowRight':
            if (xUpdate === 0) {
                xUpdate = movement;
                yUpdate = 0;
            }
            break;
    }
});

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let idx = 0; idx < snakeBody.length - 1; idx++) {
        snakeBody[idx].xPos = snakeBody[idx + 1].xPos;
        snakeBody[idx].yPos = snakeBody[idx + 1].yPos;

    }
    snakeBody[snakeBody.length - 1].xPos += xUpdate;
    snakeBody[snakeBody.length - 1].yPos += yUpdate;


    for (let idx = 0; idx < snakeBody.length; idx++) {
        snakeBody[idx].draw(ctx);
    }
    food.draw(ctx);
    if (isCollidedWithFood()) {
        food = generateFood();
        snakeBody.push(new Box(getHead().xPos, getHead().yPos, getHead().size));
        score += 10;
    }


    if (isCollidedWithWalls()) {
        xUpdate = 0;
        yUpdate = 0;
        alert(`Game Over ${score}`);
        return false;
    }
    requestAnimationFrame(() => { return update() });
}

// snakeBody.push(box);
update();



