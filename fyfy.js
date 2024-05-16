//CANVAS
let canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 3.01; //Annars är canvas för stor
const ctx = canvas.getContext("2d");

const backgroundImage = new Image(); //Skapar en ny variabel som är bild
backgroundImage.src = "theme.png"; //Bilden source är theme.png

//Skapar Player elemenst
Player1Img = new Image(); //Gör variabel Player1Img to Image format
Player1Img.src = "Player1.png"; //tilldelar Player1 bild "Player1.png"
Player2Img = new Image();
Player2Img.src = "Player2.png";
let gameObjects;

const platformWidth = 200; //Platformens bredd
const platformHeight = 20; //Platformens höjd
const spriteWidth = 120; // Sptites bredd
const spriteHeight = 80; //Sprites höjd
class Platform {
  //Playformer som man kan hoppa på
  constructor(xPos, yPos) {
    this.yPos = yPos;
    this.xPos = xPos;
  }
  //Ritar platformen
  drawPlatform(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.xPos, this.yPos, platformWidth, platformHeight);
  }
}
//Funktion för att skapa alla plattfomer
function createWorld() {
  //Lista med alla platformer
  gameObjects = [
    new Platform(100, 300),
    new Platform(800, 400),
    // new Platform(450, 370),
  ];
  //Rittar ut plattformer en efter en
  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].drawPlatform(ctx);
  }
}

class Player {
  constructor(xPos, yPos, image, direction) {
    this.name = "";
    this.hp = 100;
    this.strength = 3;
    this.x = xPos;
    this.y = yPos;
    this.speed = 10;
    this.yspeed = 3;
    this.xspeed = 0;
    this.playerImage = image;
    this.direction = direction;
    this.playerState = `idle_${this.direction}`;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.size = 2;
    this.width = spriteWidth * this.size - 180;
    this.height = spriteHeight * this.size - 80;
    this.collisionsY = false;
    this.collisionsX = false;
    this.collisions = false;
  }
  //Rittar Player och animerar den
  animate(ctx) {
    let position =
      Math.floor(gameFrame / staggerFrames) %
      spriteAnimations[this.playerState].loc.length;
    let FrameX = spriteAnimations[this.playerState].loc[position].x;
    let FrameY = spriteAnimations[this.playerState].loc[position].y;

    ctx.drawImage(
      this.playerImage,
      FrameX,
      FrameY,
      spriteWidth,
      spriteHeight,
      this.x,
      this.y,
      spriteWidth * this.size,
      spriteHeight * this.size
    );
    gameFrame++;
  }
  //Räknar ut players nya position och kollar om den kan gå dit
  newPosition() {
    //Kollar att spelaren ramlar inte under canvas höjd
    if (this.y + this.yspeed < canvas.height - (this.height + 80)) {
      if (this.collisions === false) {
        this.y += this.yspeed;
      }
    }
    //Ser till att player är inför kanterna på skärme
    if (
      this.x + this.xspeed < canvas.width - spriteWidth &&
      this.x + this.xspeed > -spriteWidth
    ) {
      // Kollar att spelaren är innanför kanterna på skärmen
      if (this.collisions === false) {
        this.x += this.xspeed;
      }
    }
  }

  collision() {
    this.collisions = false;
    for (let i = 0; i < gameObjects.length; i++) {
      if (
        this.x + 80 < gameObjects[i].xPos + platformWidth &&
        this.x + this.width + 80 > gameObjects[i].xPos &&
        this.y + 80 < gameObjects[i].yPos + platformHeight &&
        this.y + this.height + 80 > gameObjects[i].yPos
      ) {
        // Kollistion upptäckt
        this.collisions = true;
        //Kollar på höger av plattformen och hindrar spelare för att inte gå in i objecktet
        if (this.x + 80 + this.xspeed < gameObjects[i].xPos) {
          this.x = gameObjects[i].xPos - 160;
        }
        //Kollar på vänster av plattformen
        else if (
          this.x + this.width + this.xspeed + 80 >
          gameObjects[i].xPos + platformWidth
        ) {
          this.x = gameObjects[i].xPos + 160;
        }
        //Kollar under plattformen
        else if (
          this.y + this.height + this.yspeed + 80 >
          gameObjects[i].yPos
        ) {
          this.y = gameObjects[i].yPos;
        } else if (
          this.y + 80 + this.yspeed <
          gameObjects[i].yPos + platformHeight
        ) {
          //
          this.y = gameObjects[i].yPos + platformHeight;
        }
      } else {
        // ingen collition
        this.collisions = false;
      }
    }
  }
} //Här slutar player-klassen

let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = []; //Lista fylls in med alla animationer och dess koordinater
const animationStates = [
  //Lista med animationer, deras namn och antal frames
  {
    name: "idle_right",
    frames: 10,
  },
  {
    name: "idle_left",
    frames: 10,
  },
  {
    name: "run_right",
    frames: 10,
  },
  {
    name: "run_left",
    frames: 10,
  },
  {
    name: "death_right",
    frames: 10,
  },
  {
    name: "death_left",
    frames: 10,
  },
  {
    name: "attack_right",
    frames: 4,
  },
  {
    name: "attack_left",
    frames: 4,
  },
  {
    name: "jump_right",
    frames: 3,
  },
  {
    name: "jump_left",
    frames: 3,
  },
  {
    name: "fall_right",
    frames: 3,
  },
  {
    name: "fall_left",
    frames: 3,
  },
  {
    name: "turn_arround_right",
    frames: 3,
  },
  {
    name: "turn_arround_left",
    frames: 3,
  },
];

animationStates.forEach((state, index) => {
  //Går ingenom varje animation
  let frames = {
    loc: [], //Tom lista som fylls med animationens x och y koordinat
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth; //beräknar x koordinat för varje frame
    let positionY = index * spriteHeight; //beräknar y koordinat för varje frame
    frames.loc.push({ x: positionX, y: positionY }); //Fyller lista "loc" med x ovh y koordinaret
  }
  spriteAnimations[state.name] = frames; //Byter antalet frames mot dess x och y koordinat
});

window.addEventListener("keydown", function (event) {
  // Funktion som lyssnar påvad användare trycker
  switch (event.key) {
    case "w":
      Player1.yspeed = -Player1.speed;
      Player1.playerState = `jump_${Player1.direction}`;
      break;
    case "s":
      Player1.yspeed = Player1.speed;
      break;
    case "a":
      Player1.xspeed = -Player1.speed;
      Player1.direction = "left";
      Player1.playerState = `run_${Player1.direction}`;
      break;
    case "d":
      Player1.xspeed = Player1.speed;
      Player1.direction = "right";
      Player1.playerState = `run_${Player1.direction}`;
      break;
    case "f":
      Player1.attack();
      Player1.playerState = `attack_${Player1.direction}`;
      break;
    case "ArrowUp":
      Player2.yspeed = -Player2.speed;
      Player2.playerState = `jump_${Player2.direction}`;
      break;
    case "ArrowDown":
      Player2.yspeed = Player2.speed;
      break;
    case "ArrowLeft":
      Player2.xspeed = -Player2.speed;
      Player2.direction = "left";
      Player2.playerState = `run_${Player2.direction}`;
      break;
    case "ArrowRight":
      Player2.xspeed = Player2.speed;
      Player2.direction = "right";
      Player2.playerState = `run_${Player2.direction}`;
      break;
  }
});

window.addEventListener("keyup", function (event) {
  //Funktionen som lyssnar när man slutar trycka knappen
  switch (event.key) {
    case "w":
      Player1.yspeed = 3;
      Player1.playerState = `fall_${Player1.direction}`;
      break;
    case "s":
      Player1.yspeed = 3;
      Player1.playerState = `idle_${Player1.direction}`;
      break;
    case "a":
      Player1.xspeed = 0;
      Player1.playerState = `idle_${Player1.direction}`;
      break;
    case "d":
      Player1.xspeed = 0;
      Player1.playerState = `idle_${Player1.direction}`;
      break;
    case "f":
      Player1.playerState = `idle_${Player1.direction}`;
      break;
    case "ArrowUp":
      Player2.yspeed = 3;
      Player2.playerState = `fall_${Player2.direction}`;
      break;
    case "ArrowDown":
      Player2.yspeed = 3;
      Player2.playerState = `idle_${Player2.direction}`;
      break;
    case "ArrowLeft":
      Player2.xspeed = 0;
      Player2.playerState = `idle_${Player2.direction}`;
      break;
    case "ArrowRight":
      Player2.xspeed = 0;
      Player2.playerState = `idle_${Player2.direction}`;
      break;
  }
});

const Player1 = new Player(
  canvas.width - (canvas.width / spriteWidth) * 120,
  300,
  Player1Img,
  "right"
); //Skapar spelare 1
const Player2 = new Player(
  canvas.width - spriteWidth * 2,
  200,
  Player2Img,
  "left"
); //Skapar spelare 2

let lastTimestamp = 0,
  maxFPS = 90,
  timestep = 1000 / maxFPS; // hjälper för koden att inte överbelasta uträkningarna

function animate(timestamp) {
  //ritar ut allt och anropar funktioner
  if (timestamp - lastTimestamp < timestep) {
    requestAnimationFrame(animate);
    return;
  }
  lastTimestamp = timestamp;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // Rita bakgrunden
  createWorld(ctx); //Anropar funktinen som ritar ut platformer
  Player1.collision();
  Player2.collision();
  Player1.newPosition();
  Player2.newPosition();
  Player1.animate(ctx);
  Player2.animate(ctx);

  window.requestAnimationFrame(animate); // funktionen anropar sig själv
}
window.requestAnimationFrame(animate);
