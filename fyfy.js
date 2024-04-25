//CANVAS
let canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 3.01; //Annars är canvas för stor
const ctx = canvas.getContext("2d");

const backgroundImage = new Image(); //Skapar en ny variabel som är bild
backgroundImage.src = "theme.png"; //Bilden source är theme.png

//Skapar Player elemenst
Player1Img = new Image();
Player1Img.src = "Player1.png";
Player2Img = new Image();
Player2Img.src = "Player2.png";
let gameobjects;

class Platform {
  constructor(yPos, xPos) {
    this.yPos = yPos;
    this.xPos = xPos;
  }
  drawPlatform(ctx) {
    ctx.fillRect(this.yPos, this.xPos, 30, 200);
  }
}

function createWorld() {
  gameobjects = [
    new Platform(500, 300),
    new Platform(700, 500),
    new Platform(400, 500),
  ];
}

// function detectCollisions(){
//   let obj1;
//   let obj2;

//   // Reset collision state of all objects
//   for (let i = 0; i < gameObjects.length; i++) {
//       gameObjects[i].isColliding = false;
//   }

//   // Start checking for collisions
//   for (let i = 0; i < gameObjects.length; i++)
//   {
//       obj1 = gameObjects[i];
//       for (let j = i + 1; j < gameObjects.length; j++)
//       {
//           obj2 = gameObjects[j];

//           // Compare object1 with object2
//           if (rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)){
//               obj1.isColliding = true;
//               obj2.isColliding = true;
//           }
//       }
//   }
// }

class Player {
  constructor(xPos, yPos, num, image, direction) {
    this.name = "";
    this.hp = 100;
    this.strength = 3;
    this.medkit = 0;
    this.strengthPotion = 0;
    this.x = xPos;
    this.y = yPos;
    this.speed = 10;
    this.yspeed = 0;
    this.xspeed = 0;
    this.number = num;
    this.playerImage = image;
    this.direction = direction;
    this.playerState = `idle_${this.direction}`;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
  }
  useMedkit() {
    if (this.medkit > 0) {
      this.hp += medkitPower;
      this.medkit -= 1;
    }
  }
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
      spriteWidth * 2,
      spriteHeight * 2
    );
    gameFrame++;
  }
  useStrengthpotion() {
    if (this.strengthPotion > 0) {
      this.strength += strengthPotionPower;
    }
  }

  newPosition() {
    if (this.gravitySpeed < this.speed) {
      this.gravitySpeed += this.gravity;
    } else if (this.gravitySpeed >= this.speed) {
      this.gravitySpeed = 0;
    }
    if (this.y + this.yspeed < canvas.height - 235) {
      this.y += this.yspeed + this.gravitySpeed;
    }
    if (
      this.x + this.xspeed < canvas.width - spriteWidth &&
      this.x + this.xspeed > -spriteWidth
    ) {
      this.x += this.xspeed;
    }
  }

  attack(player) {
    // check if this attack hits player
    // if hit reduce hp on player
  }
} //Här slutar player-klassen
const spriteWidth = 120;
const spriteHeight = 80;

let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
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
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);

// const Platform1 = new Platform(500, 300);
// const Platform2 = new Platform(500, 400);

//Defenition av medkit och strength potion
const medkitPower = 20;
const strengthPotionPower = 5;

// function collision({ Player1, Player2 }) {
//   return Player1.x + Player1.width >= Player2.x;
// }

window.addEventListener("keydown", function (event) {
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
  switch (event.key) {
    case "w":
      Player1.yspeed = 0;
      Player1.playerState = `fall_${Player1.direction}`;
      break;
    case "s":
      Player1.yspeed = 0;
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
      Player2.yspeed = 0;
      Player2.playerState = `fall_${Player2.direction}`;
      break;
    case "ArrowDown":
      Player2.yspeed = 0;
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
//Spelare 1
const Player1 = new Player(100, 300, 1, Player1Img, "right");
const Player2 = new Player(1100, 200, 2, Player2Img, "left");

let lastTimestamp = 0,
  maxFPS = 90,
  timestep = 1000 / maxFPS;

function animate(timestamp) {
  if (timestamp - lastTimestamp < timestep) {
    requestAnimationFrame(animate);
    return;
  }
  lastTimestamp = timestamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // Rita bakgrunden
  ctx.fillStyle = "black";
  ctx.fillRect(200, 600, 200, 30);
  Player1.animate(ctx);
  Player2.animate(ctx);
  Player1.newPosition();
  Player2.newPosition();
  // if (collision({ Player1, Player2 })) {
  //   Player1.xspeed = 0;
  //   Player2.xspeed = 0;
  // }

  window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);
