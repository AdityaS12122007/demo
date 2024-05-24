var trex
var x=10
var PLAY=1
var END=0
var CHANGE=1
var gameState=PLAY
var score=0
var groundImg, ground , invisibleGround,cloud
function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundImg=loadImage("ground2.png")

  cloudImg=loadImage("cloud.png")


  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImg= loadImage("gameOver.png")
  restartImg=loadImage("restart.png")
  trexcollidedImg=loadImage("trex_collided.png")
}
function setup() 
{
  createCanvas(600,200);
  trex=createSprite(50,160,50,50);
  trex.addAnimation("running",trex_running)
  trex.debug=false
  trex.setCollider("circle",0,0,45)
  trex.scale=0.5


  ground=createSprite(200,180,400,20)

  ground.addImage("ground",groundImg)
  ground.x=ground.width/2
  //array 
  edges=createEdgeSprites()
 

  invisibleGround=createSprite(200,190,400,10)
  invisibleGround.visible=false

  obstaclesGroup=new Group()
  cloudsGroup=new Group()

  restart=createSprite(300,100,400,20)
  restart.addImage("restart",restartImg)
  restart.visible=false
  restart.scale=.5

  gameover=createSprite(300,50,400,20)
  gameover.addImage("gameOver",gameOverImg)
  gameover.visible=false
  gameover.scale=.5

 // trexcollide=createSprite(50,160,50,50)
 // trexcollide.addImage("trexcollide",trexcollidedImg)
 // trexcollide.scale=.5
}

function draw() 
{

 // console.time()
background("white")

  text("SCORE "+score,500,30)

  if(gameState===PLAY){
  score=score+Math.round(frameCount/80)
  
ground.velocityX=-2

if(ground.x<0){
   ground.x=ground.width/2

}
if(keyDown("space")){

  trex.velocityY=-10
}
trex.velocityY=trex.velocityY+0.5

 //spawn the clouds
 spawnClouds();
  
 //spawn obstacles on the ground
 spawnObstacles();

 if(obstaclesGroup.isTouching(trex)){
  gameState=END
  
 }
 
  }


  else if(gameState===END){
    ground.velocityX=0
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    trex.velocityY=0
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    restart.visible=true
    gameover.visible=true
    if(mousePressedOver(restart)){
      reset()
  
      }
    trex.changeAnimation("running",trexcollidedImg)
      }
      

  
  

//gravity

trex.collide(invisibleGround)


 
drawSprites()

  //console.timeEnd()

  //consolee.error()
  //console.warn("this is warning")
  //console.info()
  //var R=Math.round(random(10,20))
  //console.log(R)
}

  function reset(){
    gameState=PLAY
    gameover.visible=false
    restart.visible=false
    obstaclesGroup.destroyEach()
    cloudsGroup.destroyEach()
    score=0
  }


 
  

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;

   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle)
 }
}
  function spawnClouds(){
    
    if(frameCount%40===0){
      cloud=createSprite(600,100,40,10)
      cloud.addImage("cloud",cloudImg)
      cloud.velocityX=-6
      cloud.y=Math.round(random(10,120))
      cloud.scale=.5
      console.log(trex.depth)
      console.log(cloud.depth)
      cloud.depth=trex.depth
      trex.depth=trex.depth+1

      cloud.lifetime=100

      cloudsGroup.add(cloud)
    }
    
  }
