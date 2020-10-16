
  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;

var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var gameState = "PLAY"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  if (gameState === "PLAY") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    
    
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "END"
    }
    
    drawSprites();
  }
  
  if (gameState === "END"){
    stroke("yellow");
    fill("lightblue");
    textSize(19);
    text("Game Over!!...Try again by reloding the site!!", 210,100)
      
     }
  

}

function spawnDoors() {
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
   
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    

    doorsGroup.add(door);
    invisibleBlock.debug = false;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
function reset(){
  gameState = PLAY;
  doorsGroup.destroyEach();
  ghost.changeAnimation("ghost-standing.png",ghostImg);
}



