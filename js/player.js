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
    this.facingSouth = false;
    this.isShooting = false;
    // Shooting variables
    var numBullets = 10;
    this.bullets = [];
    this.currentBullet = 0;
    for (let i = 0; i < numBullets; i++) {
        this.bullets[this.bullets.length] = new Bullet();
    }
}

// Adding method to object
Player.prototype.update = function () {
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);

    this.checkDirection();
    this.checkShooting();
    this.updateAllBullets();
};

Player.prototype.draw = function () {
    this.drawAllBullets();
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
        this.srcX = 0; // Facing south
        this.facingSouth = true;
    } else if (this.isRightKey) {
        newDrawX += this.speed;
        this.srcX = 0; // Facing east
        this.facingSouth = false;
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
        if (obstacle.leftX - 8 < newCenterX &&
            newCenterX < obstacle.rightX + 8 &&
            obstacle.topY - 8 < newCenterY &&
            newCenterY < obstacle.bottomY) {
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

Player.prototype.checkShooting = function () {
    if (this.isSpacebar && !this.isShooting) {
        this.isShooting = true;
        this.bullets[this.currentBullet].fire(this.centerX, this.centerY);
        this.currentBullet++;
        if (this.currentBullet >= this.bullets.length) {
            this.currentBullet = 0;
        }
    } else if (!this.isSpacebar) {
        this.isShooting = false;
    }
};

Player.prototype.updateAllBullets = function () {
    for (let i = 0; i < this.bullets.length; i++) {
        if (this.bullets[i].isFlying) {
            this.bullets[i].update();
        }
    }
};

Player.prototype.drawAllBullets = function () {
    for (let i = 0; i < this.bullets.length; i++) {
        if (this.bullets[i].isFlying) {
            this.bullets[i].draw();
        }
    }
};
