// region class Enemy
function Enemy() {
    this.srcX = 48;
    this.srcY = 480;
    this.width = 16;
    this.height = 16;
    this.drawX = randomRange(0, canvasWidth - this.width);
    this.drawY = randomRange(0, canvasHeight - this.height);
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);
    this.targetX = this.centerX;
    this.targetY = this.centerY;
    this.randomMoveTime = randomRange(3000, 8000);
    this.speed = 1;
    // Variable for helper function in setInterval.
    const that = this;
    this.moveInterval = setInterval(function () {
        that.setTargetLocation();
    }, that.randomMoveTime);
    this.isDead = false;
}

Enemy.prototype.update = function () {
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);
    this.checkDirection();
};

Enemy.prototype.draw = function () {
    ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height)
};

Enemy.prototype.setTargetLocation = function () {
    this.randomMoveTime = randomRange(3000, 8000);
    let spaceAround = 16,
        minX = this.centerX - spaceAround,
        maxX = this.centerX + spaceAround,
        minY = this.centerY - spaceAround,
        maxY = this.centerY + spaceAround;

    if (minX < 0) {
        minX = 0;
    } else if (maxX > canvasWidth) {
        maxX = canvasWidth;
    }

    if (minY < 0) {
        minY = 0;
    } else if (minY > canvasHeight) {
        minY = canvasHeight;
    }

    this.targetX = randomRange(minX, maxX);
    this.targetY = randomRange(minY, maxY);
};

Enemy.prototype.checkDirection = function () {
    if (this.centerX < this.targetX) {
        this.drawX += this.speed;
    } else if (this.centerX > this.targetX) {
        this.drawX -= this.speed;
    }
    if (this.centerY < this.targetY) {
        this.drawY += this.speed;
    } else if (this.centerY > this.targetY) {
        this.drawY -= this.speed;
    }
};

Enemy.prototype.die = function () {
    const soundEffect = new Audio("audio/dying.ogg");
    soundEffect.play();

    clearInterval(this.moveInterval);
    this.srcY = this.srcY + 16;
    this.isDead = true;
};
// endregion class Enemy
// region function of enemies
function initEnemies() {
    for (let i = 0; i < numEnemies; i++) {
        enemies[enemies.length] = new Enemy();
    }
}

function updateAllEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update();
    }
}

function drawAllEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }
}

// endregion function of enemies
