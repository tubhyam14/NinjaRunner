// story: You will be playing as a ninja who is assined on a mission to collect scroll 
//you have to collect scroll and beware of shruken which enemy has Planted

var PLAY= 1 ;
var END= 0 ;
var gameState= PLAY ;
var length;
var ground, groundImage, invisibleGround;
var ninja , ninjaRunning , ninjaout;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var jumpSound, dieSound, song ;
var gameOver, restart, gameOverImage, restartImage , score;
var scroll,scrollImage, scrollScore=0 ;



function preload() {
    groundImage = loadImage("Image/background.jpg");
    ninjaRunning = loadAnimation("Image/run00.png","Image/run02.png", "Image/run03.png", "Image/run04.png"/*,"Image/run05.png","Image/run06.png","Image/run07.png"*/,"Image/run08.png","Image/run09.png");
    obstacle1 = loadImage("Image/obstacle1.png");
    jumpSound = loadSound("track/jump.mp3");
    dieSound = loadSound("track/die.mp3");
    checkPointSound = loadSound("track/checkPoint.mp3");
    gameOverImage = loadImage("Image/gameOver1.png");
    restartImage = loadImage("Image/restart1.png");
    scrollImage =loadImage("Image/scroll.png") ;
    song= loadSound("track/Naruto_Track.ogg");
    ninjaout= loadImage("Image/run02.png");
  }

  function setup() {
   

    createCanvas(600, 500);
    ground = createSprite(0, 50, 0, 0);
    ground.shapeColor = "white";
    ground.addImage("ground", groundImage);
    ground.scale = 1;
    ground.velocityX = -5;
  
  ninja = createSprite(50, 300, 600, 10);
  ninja.addAnimation("ninja running" ,ninjaRunning);
  ninja.addImage("ninja out",ninjaout);
  ninja.scale =2;
  ninja.debug = false;
  ninja.setCollider("rectangle", 0, 0,30,55)
  
 


  invisibleGround = createSprite(300, 350, 600, 10);
  invisibleGround.visible = false;

  gameOver = createSprite(290, 120);
  gameOver.addImage("game over", gameOverImage);
  gameOver.scale=0.7

  restart = createSprite(300, 270);
  restart.addImage("restart",restartImage);
  restart.scale=.1

  obstaclesGroup = new Group();
  scrollGroup= new Group();

  score = 0;



  }

  function draw() {
  
    background("black");

//console.log(ninja.y);
  
 
   ninja.velocityY = ninja.velocityY +.5;
   ninja.collide(invisibleGround);
  


  if (gameState === PLAY) {
    gameOver.visible = false;
    restart.visible = false;
    ninja.changeAnimation("ninja running",ninjaRunning)
    score = score + Math.round(getFrameRate() / 60);

    spawnObstacles();
    spawnScroll();
    
    ground.velocityX = -(4 + 3 * score / 100);

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

   /* if (score > 0 && score % 100 === 0) {
      checkPointSound.play()
    }*/

  if ((keyDown("space")  && ninja.y >= 290)) {
        ninja.velocityY = -10;
      jumpSound.play();
    }

    if(touches.length > 0 && ninja.y  >= -290) {
      jumpSound.play()
      ninja.velocityY = -10;
       touches = [];
    }

    if (ninja.isTouching(obstaclesGroup)) {
      gameState = END;
      dieSound.play();
 }

    if(ninja.isTouching(scrollGroup)){
       scrollScore= scrollScore+1;
     scrollGroup.destroyEach()

    }




  } else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    ground.velocityX = 0;
    ninja.velocityY = 0
    ninja.changeImage("ninja out", ninjaout);
    
   if(touches.length > 0){
       reset();
       touches= [];
       }
    
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);

    scrollGroup.setLifetimeEach(-1);
    scrollGroup.setVelocityXEach(0);
     scrollGroup.destroyEach();
    if (mousePressedOver(restart)) {
      reset();
    }
      
  }


  drawSprites();
  fill("black");
  textSize(20);
  text("Score: " + score, 500, 50);

  fill("black");
  textSize(20);
  text("Scroll: " + scrollScore, 410, 50);


}

function reset() {
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    obstaclesGroup.destroyEach();
    score = 0;
    ninja.changeAnimation("ninja running", ninjaRunning)
   
  }

  function spawnObstacles() {
    if (frameCount % 95 === 0) {
      var obstacle = createSprite(600, 320, 10, 40);
      obstacle.velocityX = -(6+ score/100);
  
     
      obstacle.addImage("stone",obstacle1);
      obstacle.scale = .08;
      obstaclesGroup.add(obstacle);
      obstacle.debug = true;
      obstacle.setCollider("circle", 0, 0, 280);
    }
  
  }
  function spawnScroll() {

    if (frameCount % 95 === 0) {
      var scroll = createSprite(600, 250, 10, 40);
      scroll.velocityX = -6.5; 
  
      scroll.addImage(scrollImage);
      scroll.scale = 0.1;
      scrollGroup.add(scroll);
      scroll.debug = false;
      scroll.setCollider("circle", 0, 0, 100);
      
    }

  }

