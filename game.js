const canvasBg = document.getElementById("canvasBg"),
    ctxBg = canvasBg.getContext("2d"),
    canvasEntities = document.getElementById("canvasEntities"),
    ctxEntities = canvasEntities.getContext("2d");

const canvasWidth = canvasBg.width,
    canvasHeight = canvasBg.height,
    topPadding = 104;

player = new Player();
// enemies = [],
// numEnemies = 5,
obstacles = [];
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
    document.addEventListener("keydown", function (event) {
        checkKey(event, true)
    }, false);
    document.addEventListener("keyup", function (event) {
        checkKey(event, false)
    }, false);
    defineObstacles();
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
    this.drawX = 224 - 32;
    this.drawY = 336;
    // Center of player for collision
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);
    // Speed of moving player.
    this.speed = 2;
    // Control keys
    this.isUpKey = false;
    this.isRightKey = false;
    this.isDownKey = false;
    this.isLeftKey = false;
    this.isSpacebar = false;
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

    this.checkDirection();
    //this.checkShooting();
    //this.updateAllBullets();
};

Player.prototype.draw = function () {
    // this.drawAllBullets();
    ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
};

Player.prototype.checkDirection = function () {
    let newDrawX = this.drawX,
        newDrawY = this.drawY,
        obstacleCollision;

    if (this.isUpKey) {
        newDrawY -= this.speed;
        this.srcX = 32; // Facing north
    } else if (this.isDownKey) {
        newDrawY += this.speed;
        this.srcX = 0; // South north
    } else if (this.isRightKey) {
        newDrawX += this.speed;
        this.srcX = 0; // Facing east
    } else if (this.isLeftKey) {
        newDrawX -= this.speed;
        this.srcX = 16; // Facing west
    }

    obstacleCollision = this.checkObstacleCollide(newDrawX, newDrawY);

    if (!obstacleCollision && !outOfBounds(this, newDrawX, newDrawY)) {
        this.drawX = newDrawX;
        this.drawY = newDrawY;
    }
};

Player.prototype.checkObstacleCollide = function (newDrawX, newDrawY) {
    var obstacleCounter = 0,
        newCenterX = newDrawX + (this.width / 2),
        newCenterY = newDrawY + (this.height / 2),
        obstacle;

    for (let i = 0; i < obstacles.length; i++) {
        obstacle = obstacles[i];
        if (obstacle.leftX - 6 < newCenterX &&
            newCenterX < obstacle.rightX + 8 &&
            obstacle.topY < newCenterY &&
            newCenterY < obstacle.bottomY + 12) {
            obstacleCounter = 0;
        } else {
            obstacleCounter++;
        }
    }

    if (obstacleCounter === obstacles.length) {
        return false;
    } else {
        return true;
    }
};

function Obstacle(x, y, w, h) {
    this.drawX = x;
    this.drawY = y;
    this.width = w;
    this.height = h;
    this.leftX = this.drawX;
    this.rightX = this.drawX + this.width;
    this.topY = this.drawY;
    this.bottomY = this.drawY + this.height;
}

function defineObstacles() {
    const tileWidth = 12,
        tileHeight = 12,
        smallObstacleWidth = tileWidth,
        smallObstacleHeight = tileHeight,
        pillarWidth = 3 * tileWidth,
        pillarHeight = 3 * tileHeight;

    obstacles = [
        // Walls
        // Room 01 + 02
        new Obstacle(6 * tileWidth, topPadding, tileWidth, 14 * tileHeight),
        new Obstacle(6 * tileWidth, topPadding + 13 * tileHeight, 7 * tileWidth, tileHeight),
        new Obstacle(16 * tileWidth, topPadding, tileWidth, 9 * tileHeight),
        new Obstacle(6 * tileWidth, topPadding + 8 * tileHeight, 4 * tileWidth, tileHeight),
        new Obstacle(12 * tileWidth, topPadding + 8 * tileHeight, 5 * tileWidth, tileHeight),
        new Obstacle(16 * tileWidth, topPadding + 13 * tileHeight, 7 * tileWidth, tileHeight),
        new Obstacle(22 * tileWidth, topPadding + 10 * tileHeight, tileWidth, 4 * tileHeight),
        // Room 03
        new Obstacle(6 * tileWidth, topPadding + 23 * tileHeight, tileWidth, 3 * tileHeight),
        new Obstacle(6 * tileWidth, topPadding + 28 * tileHeight, tileWidth, 2 * tileHeight),
        new Obstacle(6 * tileWidth, topPadding + 23 * tileHeight, 19 * tileWidth, tileHeight),
        new Obstacle(24 * tileWidth, topPadding + 23 * tileHeight, tileWidth, 7 * tileHeight),
        // Room 04
        new Obstacle(28 * tileWidth, topPadding + 11 * tileHeight, tileWidth, 13 * tileHeight),
        new Obstacle(28 * tileWidth, topPadding + 11 * tileHeight, 5 * tileWidth, tileHeight),
        new Obstacle(36 * tileWidth, topPadding + 11 * tileHeight, 4 * tileWidth, tileHeight),
        new Obstacle(28 * tileWidth, topPadding + 23 * tileHeight, 5 * tileWidth, tileHeight),
        new Obstacle(36 * tileWidth, topPadding + 23 * tileHeight, 4 * tileWidth, tileHeight),

        // Pillars
        new Obstacle(6 * tileWidth, topPadding + 17 * tileHeight, pillarWidth, pillarHeight),
        new Obstacle(12 * tileWidth, topPadding + 17 * tileHeight, pillarWidth, pillarHeight),
        new Obstacle(18 * tileWidth, topPadding + 17 * tileHeight, pillarWidth, pillarHeight),
        new Obstacle(20 * tileWidth, topPadding + 4 * tileHeight, pillarWidth, pillarHeight),
        new Obstacle(33 * tileWidth, topPadding + 4 * tileHeight, pillarWidth, pillarHeight),

        // Boxes
        // Boxes 01
        new Obstacle(tileWidth, topPadding + 11 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(tileWidth, topPadding + 12 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(tileWidth, topPadding + 13 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(tileWidth, topPadding + 14 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(tileWidth, topPadding + 15 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        // Boxes 02
        new Obstacle(26 * tileWidth, topPadding + 7 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(26 * tileWidth, topPadding + 8 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        // Boxes 03
        new Obstacle(28 * tileWidth, topPadding + 3 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(28 * tileWidth, topPadding + 4 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(28 * tileWidth, topPadding + 5 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(28 * tileWidth, topPadding + 6 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(28 * tileWidth, topPadding + 7 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(28 * tileWidth, topPadding + 8 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        // Boxes 04
        new Obstacle(33 * tileWidth, topPadding + 14 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(33 * tileWidth, topPadding + 15 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(33 * tileWidth, topPadding + 16 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(33 * tileWidth, topPadding + 17 * tileHeight, smallObstacleWidth, smallObstacleHeight),

        // Stones
        // Stones01
        new Obstacle(27 * tileWidth, topPadding + 3 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(27 * tileWidth, topPadding + 4 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(27 * tileWidth, topPadding + 5 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(27 * tileWidth, topPadding + 6 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(27 * tileWidth, topPadding + 7 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(27 * tileWidth, topPadding + 8 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        // Stones02
        new Obstacle(32 * tileWidth, topPadding + 14 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(32 * tileWidth, topPadding + 15 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(32 * tileWidth, topPadding + 16 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(32 * tileWidth, topPadding + 17 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(32 * tileWidth, topPadding + 18 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(33 * tileWidth, topPadding + 18 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(34 * tileWidth, topPadding + 18 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(35 * tileWidth, topPadding + 18 * tileHeight, smallObstacleWidth, smallObstacleHeight),

        // Jars
        // Jars01
        new Obstacle(14 * tileWidth, topPadding + 6 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(15 * tileWidth, topPadding + 6 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(14 * tileWidth, topPadding + 7 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(15 * tileWidth, topPadding + 7 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        // Jars02
        new Obstacle(7 * tileWidth, topPadding + 12 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(8 * tileWidth, topPadding + 12 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(9 *  tileWidth, topPadding + 12 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        // Jars03
        new Obstacle(20 * tileWidth, topPadding + 24 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(21 * tileWidth, topPadding + 24 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(22 * tileWidth, topPadding + 24 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(23 * tileWidth, topPadding + 24 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(20 * tileWidth, topPadding + 25 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(21 * tileWidth, topPadding + 25 * tileHeight, smallObstacleWidth, smallObstacleHeight),
    ]
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
        bottomBorder = 480 + 4 - 16,
        rightBorder = 480 + 4 - 16,
        leftBorder = 12;

    return newBottomY > bottomBorder ||
        newTopY < topBorder ||
        newRightX > rightBorder ||
        newLeftX < leftBorder;
}
