// region global variables
const canvasBg = document.getElementById("canvasBg"),
    ctxBg = canvasBg.getContext("2d"),
    canvasEntities = document.getElementById("canvasEntities"),
    ctxEntities = canvasEntities.getContext("2d");

const canvasWidth = canvasBg.width,
    canvasHeight = canvasBg.height,
    topPadding = 0;

const player = new Player();
let enemies = [];
const numEnemies = 5;
let obstacles = [];
let isPlaying = false;

// || Means that if not exist it will try next and last line safe line.
const requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

const imgSprite = new Image();
imgSprite.src = "images/sprites.png";
imgSprite.addEventListener("load", init, false);
// endregion global variables
// region main methods
function init() {
    document.addEventListener("keydown", function (event) {
        checkKey(event, true)
    }, false);
    document.addEventListener("keyup", function (event) {
        checkKey(event, false)
    }, false);
    defineObstacles();
    initEnemies();
    begin();
}

function begin() {
    // image, position in image, where to draw
    ctxBg.drawImage(imgSprite, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
    isPlaying = true;
    requestAnimationFrame(loop)
}

function update() {
    clearCtx(ctxEntities);
    updateAllEnemies();
    player.update();
}

function draw() {
    drawAllEnemies();
    player.draw();
}

// main game loop
function loop() {
    if (isPlaying) {
        update();
        draw();
        requestAnimationFrame(loop);
    }
}

// endregion main functions

// region helper functions
function clearCtx(ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function randomRange(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function checkKey(event, value) {
    const keyId = event.keyCode || event.which;
    switch (keyId) {
        case 38: // Up arrow
            player.isUpKey = value;
            event.preventDefault();
            break;
        case 39: // Right arrow
            player.isRightKey = value;
            event.preventDefault();
            break;
        case 40: // Down arrow
            player.isDownKey = value;
            event.preventDefault();
            break;
        case 37: // Left arrow
            player.isLeftKey = value;
            event.preventDefault();
            break;
        case 32: // Spacebar
            player.isSpacebar = value;
            event.preventDefault();
            break;
    }
}

function outOfBounds(object, x, y) {
    const
        newBottomY = y + object.height,
        newTopY = y,
        newRightX = x + object.width,
        newLeftX = x,
        topBorder = topPadding + 16,
        bottomBorder = 480 + 6 - 16,
        rightBorder = 640 - 16,
        leftBorder = 16;

    return newBottomY > bottomBorder ||
        newTopY < topBorder ||
        newRightX > rightBorder ||
        newLeftX < leftBorder;
}

function collision(objectA, objectB) {
    return objectA.drawX <= objectB.drawX + objectB.width &&
        objectA.drawX >= objectB.drawX &&
        objectA.drawY <= objectB.drawY + objectB.height &&
        objectA.drawY >= objectB.drawY;
}

// endregion helper functions
