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
    const tileWidth = 16,
        tileHeight = 16,
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
        new Obstacle(9 * tileWidth, topPadding + 12 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        // Jars03
        new Obstacle(20 * tileWidth, topPadding + 24 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(21 * tileWidth, topPadding + 24 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(22 * tileWidth, topPadding + 24 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(23 * tileWidth, topPadding + 24 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(20 * tileWidth, topPadding + 25 * tileHeight, smallObstacleWidth, smallObstacleHeight),
        new Obstacle(21 * tileWidth, topPadding + 25 * tileHeight, smallObstacleWidth, smallObstacleHeight),
    ]
}

