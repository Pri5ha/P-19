var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameoverImg,restartImg;
var player,ground;
var obstaclesGroup;
var score;
var gameOver,restart;

function preload(){
    gameoverImg = loadImage("gameover.png");
    restartImg = loadImage("reset.png");
}

function setup() {
    createCanvas(600,200);
    player = createSprite(50,170,20,20);

    ground = createSprite(width/2,180,width*2,5);
    ground.velocityX = -5;

    gameOver = createSprite(300,100);
    gameOver.addImage(gameoverImg);

    restart = createSprite(300,140);
    restart.addImage(restartImg)

    gameOver.scale = 0.1;
    restart.scale = 0.05;

    obstaclesGroup = new Group();

    score = 0;
}

function draw() {
    background("white");

    text("Score: "+score,520,50)

    if (gameState === PLAY){
        gameOver.visible = false;
        restart.visible = false;

        if (keyDown(UP_ARROW) && player.y >= 150){
            player.velocityY = -12;
        }
        player.velocityY += 0.8;

        if (ground.x <= 0){
            ground.x = width/2;
        }

        if (frameCount%60 == 0){
            spawnObstacles();
        }

        player.collide(ground);

        score += 1;

        if (obstaclesGroup.isTouching(player)){
            gameState = END
        }
    }

    else if(gameState === END){
        gameOver.visible = true;
        restart.visible = true;
                
        ground.velocityX = 0;
        player.velocityY = 0
      
        obstaclesGroup.setLifetimeEach(-1);
        obstaclesGroup.setVelocityXEach(0);
     
        if(mousePressedOver(restart)){
            reset();
        }
    }

    drawSprites();
    }

function spawnObstacles(){
    obstacle = createSprite(width,160,20,40);

    obstacle.shapeColor = "red";
    obstacle.velocityX = -5;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
}

function reset(){
    gameState = PLAY;
    obstaclesGroup.destroyEach();
    score = 0;
}