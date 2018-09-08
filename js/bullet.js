function Bullet() {
    this.radius = 2;
    this.drawX = 0;
    this.drawY = 0;
    this.isFlying = false;
    this.xVel = 0;
    this.yVel = 0;
    this.speed = 6;
}

Bullet.prototype.update = function () {
    this.drawX += this.xVel;
    this.drawY += this.yVel;
    this.checkHitEnemy();
    this.checkHitObstacle();
    this.checkOutOfBounds();
};

Bullet.prototype.draw = function () {
    ctxEntities.fillStyle = "green";

    ctxEntities.beginPath();
    ctxEntities.arc(this.drawX, this.drawY, this.radius, 0, Math.PI * 2, false);
    ctxEntities.closePath();

    ctxEntities.fill();
};

Bullet.prototype.fire = function (startX, startY) {
    let soundEffect = new Audio("audio/shoot.ogg");
    this.drawX = startX;
    this.drawY = startY;

    if (player.srcX === 0) { // Facing south or east
        if (player.facingSouth) {
            this.xVel = 0;
            this.yVel = this.speed;
        } else {
            this.xVel = this.speed;
            this.yVel = 0;
        }
    } else if (player.srcX === 32) { // Facing north
        this.xVel = 0;
        this.yVel = -this.speed;
    } else if (player.srcX === 16) { // Facing west
        this.xVel = -this.speed;
        this.yVel = 0;
    }

    this.isFlying = true;
    soundEffect.play();
};

Bullet.prototype.recycle = function () {
    this.isFlying = false;
};

Bullet.prototype.checkHitEnemy = function () {
    for (let i = 0; i < enemies.length; i++) {
        if (collision(this, enemies[i]) && !enemies[i].isDead) {
            this.recycle();
            enemies[i].die();
        }
    }
};

Bullet.prototype.checkHitObstacle = function () {
    for (let i = 0; i < obstacles.length; i++) {
        if (collision(this, obstacles[i])) {
            this.recycle();
        }
    }
};

Bullet.prototype.checkOutOfBounds = function () {
    if (outOfBounds(this, this.drawX, this.drawY)) {
        this.recycle();
    }
};
