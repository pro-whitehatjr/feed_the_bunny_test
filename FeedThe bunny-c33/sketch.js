const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;

var bg_img;
var food;
var rabbit;
var bunny;
var blink,eat,sad;

var button;
var button2;
var button3;

var fr,rope2;
var rope3;

function preload()
{
  bg_img = loadImage('assets/background.png');
  food = loadImage('assets/melon.png');
  rabbit = loadImage('assets/Rabbit-01.png');

  blink = loadAnimation("assets/blink_1.png","assets/blink_2.png","assets/blink_3.png");
  eat = loadAnimation("assets/eat_0.png" , "assets/eat_1.png","assets/eat_2.png","assets/eat_3.png","assets/eat_4.png");
  sad = loadAnimation("assets/sad_1.png","assets/sad_2.png","assets/sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

var w;
var h;

function setup() {
  createCanvas(500,700);
  w = windowWidth;
  h = windowHeight;
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  
  button = createImg('assets/cut_btn.png');
  button.position(60,30);
  button.size(50,50);
  button.mouseClicked(drop);

  //btn 2
  button2 = createImg('assets/cut_btn.png');
  button2.position(370,35);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  //btn3
  button3 = createImg('assets/cut_btn.png');
  button3.position(400,220);
  button3.size(50,50);
  button3.mouseClicked(drop3);

  
  rope = new Rope(8,{x:80,y:30});
  rope2 = new Rope(7,{x:400,y:40});
  rope3 = new Rope(4,{x:430,y:225});

  ground = new Ground(200,690,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny = createSprite(80,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);
  fruit_con_3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2);

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
  }
   

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
  }
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function drop3()
{
  rope3.break();
  fruit_con_3.dettach();
  fruit_con_3 = null;
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }

            else{
              return false;
            }
         }
}

