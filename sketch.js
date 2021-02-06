var trex, trexrunning, trexcollided;
var ground, invisibleground, groundimg, cloud, cloudimg;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gamestate = "play";
var play = 1;
var end = 0;
var score = 0;
var cloudgroup, obstaclegroup;
var gameover, gameoverimg, restart, restartimg;


function preload() {
  trexrunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexcollided = loadAnimation("trex_collided.png");
  groundimg = loadImage("ground2.png");
  cloudimg = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trexrunning);

  trex.addAnimation("collided", trexcollided);

  trex.scale = 0.5;
  trex.x = 50;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundimg);
  ground.x = ground.width / 2;

  invisibleground = createSprite(200, 190, 400, 10);
  invisibleground.visible = false;

  cloudgroup = createGroup();
  obstaclegroup = createGroup();

  trex.setCollider("circle", 0, 0, 40);
  trex.debug = true;

  gameover = createSprite(300, 100);
  gameover.addImage(gameoverimg);
  gameover.scale = 0.5;

  restart = createSprite(300, 140);
  restart.addImage(restartimg);
  restart.scale = 0.5;
}

function draw() {
  background(180);

  text("Score:" + score, 500, 50);

  if (gamestate === "play") {
    trex.changeAnimation("running");
    gameover.visible = false;
    restart.visible = false;
    score = score + Math.round(frameCount / 60);

    ground.velocityX = -2;

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space") && trex.y >= 100) {
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.8;

    spawnClouds();

    spawnObstacles();
    if (obstaclegroup.isTouching(trex)) {
      gamestate = end;
    }
  } else if (gamestate === end) {
    gameover.visible = true;
    restart.visible = true;
    trex.changeAnimation("collided", trexcollided);
    ground.velocityX = 0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    if (mousePressedOver(restart)) {
      reset();
    }
  }
  trex.collide(invisibleground);

  drawSprites();

}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(500, 100, 40, 10);
    cloud.addImage(cloudimg);
    cloud.scale = 0.4;
    cloud.velocityX = -5;
    cloud.y = Math.round(random(10, 60));

    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    cloud.lifetime = 200;
    cloudgroup.add(cloud);
  }

}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(400, 165, 10, 40);
    obstacle.velocityX = -6;
    obstacle.scale = 0.5
    obstacle.lifetime = 300;

    var selectsprites = Math.round(random(1, 6));
    switch (selectsprites) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }
    obstaclegroup.add(obstacle);

  }
}

function reset() {
  gamestate = "play";
  gameover.visible = false
  restart.visible = false;

  obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
  score = 0;
}