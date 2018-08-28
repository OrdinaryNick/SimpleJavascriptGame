const canvasBg = document.getElementById("canvasBg"),
    ctxBg = canvasBg.getContext("2d"),
    canvasEntities = document.getElementById("canvasEntities"),
    ctxEntities = canvasEntities.getContext("2d");

const canvasWidth = canvasBg.width,
    canvasHeight = canvasBg.height;

 player = new Player();
// enemies = [],
// numEnemies = 5,
// obstacles = []
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

function init() {
    // document.addEventListener("keydown", checkKeyDown, false);
    // document.addEventListener("keyup", checkKeyUp, false);
    // defineObstacles();
    // initEnemies();
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
    // updateAllEnemies();
    player.update();
}

function draw() {
    // drawAllEnemies
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

function clearCtx(ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function randomRange(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

// Defining object player
function Player() {
    // Image of player in sprites image
    this.srcX = 0;
    this.srcY = 480;
    this.width = 16;
    this.height = 32;
    // Where player should be draw
    this.drawX = 224;
    this.drawY = 336;
    // Center of player for collision
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);
    // Speed of moving player.
    this.speed = 2;
    // Control keys
    // this.isUpKey = false;
    // this.isRightKey = false;
    // this.isDownKey = false;
    // this.isLeftKey = false;
    // this.isSpacebar = false;
    // this.isShooting = false;
    // Shooting variables
    //var numBullets = 10;
    // this.bullets = [];
    // this.currentBullet = 0;
    // for (var i = 0; i < numBullets; i++) {
    //     this.bullets[this.bullets.length] = new Bullet();
    // }
}

// Adding method to object
Player.prototype.update = function () {
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);

    //this.checkDirection();
    //this.checkShooting();
    //this.updateAllBullets();
};

Player.prototype.draw = function () {
    // this.drawAllBullets();
    ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
};

