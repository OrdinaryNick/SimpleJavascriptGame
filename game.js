const canvasBg = document.getElementById("canvasBg"),
    ctxBg = canvasBg.getContext("2d"),
    canvasEntities = document.getElementById("canvasEntities"),
    ctxEntities = canvasEntities.getContext("2d");

const canvasWidth = canvasBg.width,
    canvasHeight = canvasBg.height;

    // player1 = new Player();
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

// main game loop
function loop() {

}
