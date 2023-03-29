var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground, groundImage, invisibleGround;
var ninja, ninjaRunning, ninjaout;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var jumpSound, dieSound, checkPointSound, song;
var gameOver, restart, gameOverImage, restartImage, score;
var scroll, scrollImage, scrollScore = 0;

function preload() {
  groundImage = loadImage("Image/background.jpg");
  ninjaRunning = loadAnimation(
    "Image/run00.png",
    "Image/run02.png",
    "Image/run03.png",
    "Image/run04.png",
    "Image/run08.png",
    "Image/run09.png"
  );
  obstacle1 = loadImage("Image/obstacle1.png");
  jumpSound = loadSound("track/jump.mp3");
  dieSound = loadSound("track/die.mp3");
  checkPointSound = loadSound("track/checkPoint.mp3");
  gameOverImage = loadImage("Image/gameOver1.png");
  restartImage = loadImage("Image/restart1.png");
  scrollImage = loadImage("Image/scroll.png");
  song = loadSound("track/Naruto_Track.ogg");
  ninjaout = loadImage("Image/run02.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ground = createSprite(0, 50, 0, 0);
  ground.shapeColor = "white";
  ground.addImage("ground", groundImage);
  ground.scale = 1;
  ground.velocityX = -5;

  ninja = createSprite(50, 300, 600, 10);
  ninja.addAnimation("ninja running", ninjaRunning);
  ninja.addImage("ninja out", ninjaout);
  ninja.scale = 2;
  ninja.debug = false;
  ninja.setCollider("rectangle", 0, 0, 30, 55);

  invisibleGround = createSprite(300, 350, 600, 10);
  invisibleGround.visible = false;

  gameOver = createSprite(200, 120);
  gameOver.addImage("game over", gameOverImage);
  gameOver.scale = 0.7;

  restart = createSprite(200, 270);
  restart.addImage("restart", restartImage);
  restart.scale = 0.1;

  obstaclesGroup = new Group();
  scrollGroup = new Group();

  score = 0;
}

function draw() {
  background("black");

  ninja.velocityY = ninja.velocityY + 0.5;
  ninja.collide(invisibleGround);

  if (gameState === PLAY) {
    gameOver.visible = false;
    restart.visible = false;
    ninja.changeAnimation("ninja running", ninjaRunning);
    score = score + Math.round(getFrameRate() / 60);

    spawnObstacles();
    spawnScroll();

   ground.velocityX = -(7 + (3 * score) / 100);

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && ninja.y >= 290) {
      ninja.velocityY = -10;
      jumpSound.play();
    }

    if (touches.length > 0 && ninja.y >= -290) {
      jumpSound.play();
      ninja.velocityY = -10;
      touches = [];
    }

    if (ninja.isTouching(obstaclesGroup)) {
      gameState = END;
      dieSound.play();
    }

    if (ninja.isTouching(scrollGroup)) {
      scrollScore = scrollScore + 1
