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
  constructor(xPos, yPos, width, height, colour) {
    this.yPos = yPos;
    this.xPos = xPos;
    this.width = width;
    this.height = height;
    this.colour = colour;
  }
  //Ritar platformen
  drawPlatform(ctx) {
    ctx.fillStyle = this.colour;
    ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
  }
}
//Funktion för att skapa alla plattfomer
function createWorld() {
  //Lista med alla platformer
  gameObjects = [
    new Platform(100, 300, platformWidth, platformHeight, "black"),
    new Platform(900, 350, platformWidth, platformHeight, "black"),
    new Platform(450, 370, platformWidth, platformHeight, "black"),
    new Platform(0, 478, 700, 70, "transparent"),
    new Platform(920, 478, canvas.width, 70, "transparent"),
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
    this.speed = 7;
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
    this.fallspeed = 3;
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
      } else if (this.collisions === true) {
        this.yspeed = 0;
      }
    }
    //Ser till att player är inför kanterna på skärmen
    if (
      this.x + this.xspeed < canvas.width - spriteWidth &&
      this.x + this.xspeed > -spriteWidth
    ) {
      if (this.collisions === false) {
        this.x += this.xspeed;
      }
    }

    //     if(x===wetland){}
    //       else (import.turtle===x)
    //       {
    //  return turtle
    //       }
  }

  collision() {
    this.collisions = false;
    for (let i = 0; i < gameObjects.length; i++) {
      if (
        this.x + 80 + this.xspeed <
          gameObjects[i].xPos + gameObjects[i].width &&
        this.x + this.width + 80 + this.xspeed > gameObjects[i].xPos &&
        this.y + 80 + this.yspeed <
          gameObjects[i].yPos + gameObjects[i].height &&
        this.y + this.height + 80 + this.yspeed > gameObjects[i].yPos
      ) {
        // Kollistion upptäckt
        this.collisions = true;
        console.log("collision");
      }
    }
    //Heeeeeeeeeeej, dettya ser komplicerat uuuut. Lycka till med resten! -Linnea
    //Wopsie!
  }
  fallspeed(leftRight, upDown) {
    if (upDown == true && leftRight == false) {
      if (this.collisions == true) {
        this.yspeed = 0;
      } else {
        this.yspeed = 5;
      }
    } else if (upDown == false && leftRight == true) {
      if (this.collisions == true) {
        this.yspeed = 0;
        this.xspeed = 0;
      } else {
        this.yspeed = 5;
        this.xspeed = 0;
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
      if (Player1.collisions == true) {
        Player1.yspeed = 0;
      } else {
        Player1.yspeed = 5;
      }
      Player1.playerState = `fall_${Player1.direction}`;
      break;
    case "s":
      if (Player1.collisions == true) {
        Player1.yspeed = 0;
      } else {
        Player1.yspeed = 5;
      }
      Player1.playerState = `idle_${Player1.direction}`;
      break;
    case "a":
      if (Player1.collisions == true) {
        Player1.yspeed = 0;
        Player1.xspeed = 0;
      } else {
        Player1.yspeed = 5;
        Player1.xspeed = 0;
      }
      Player1.playerState = `idle_${Player1.direction}`;
      break;
    case "d":
      if (Player1.collisions == true) {
        Player1.yspeed = 0;
        Player1.xspeed = 0;
      } else {
        Player1.yspeed = 5;
        Player1.xspeed = 0;
      }

      Player1.playerState = `idle_${Player1.direction}`;
      break;
    case "f":
      Player1.playerState = `idle_${Player1.direction}`;
      break;
    case "ArrowUp":
      if (Player2.collisions == true) {
        Player2.yspeed = 0;
      } else {
        Player2.yspeed = 5;
      }
      Player2.playerState = `fall_${Player2.direction}`;
      break;
    case "ArrowDown":
      if (Player2.collisions == true) {
        Player2.yspeed = 0;
      } else {
        Player2.yspeed = 5;
      }
      Player2.playerState = `idle_${Player2.direction}`;
      break;
    case "ArrowLeft":
      if (Player1.collisions == true) {
        Player2.yspeed = 0;
        Player2.xspeed = 0;
      } else {
        Player2.yspeed = 5;
        Player2.xspeed = 0;
      }
      Player2.playerState = `idle_${Player2.direction}`;
      break;
    case "ArrowRight":
      if (Player1.collisions == true) {
        Player2.yspeed = 0;
        Player2.xspeed = 0;
      } else {
        Player2.yspeed = 5;
        Player2.xspeed = 0;
      }
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
