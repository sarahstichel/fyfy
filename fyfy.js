//CANVAS
let canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 3.01; //Annars är canvas för stor
const ctx = canvas.getContext("2d");

const backgroundImage = new Image(); //Skapar en ny variabel som är bild
backgroundImage.src = "theme.png"; //Bilden source är theme.png
//Skapar Player elemenst
Player1Img = new Image();
Player1Img.src = "Player1_combined.png";
Player2Img = new Image();
Player2Img.src = "Player2_combined.png";
class Player {
  constructor(xPos, yPos, num, image) {
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
    this.playerState = "idle";
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
      spriteWidth * 3,
      spriteHeight * 3
    );

    gameFrame++;
  }
  useStrengthpotion() {
    if (this.strengthPotion > 0) {
      this.strength += strengthPotionPower;
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
    name: "idle",
    frames: 10,
  },
  {
    name: "death",
    frames: 10,
  },
  {
    name: "run",
    frames: 10,
  },
  {
    name: "attack",
    frames: 4,
  },
  {
    name: "jump",
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

//Här börjar Sprite

//Defenition av medkit och strength potion
const medkitPower = 20;
const strengthPotionPower = 5;
//Spelare 1
const Player1 = new Player(100, 200, 1, Player1Img);
const Player2 = new Player(1100, 200, 2, Player2Img);

class Platform {
  // draw(ctx) {
  //   ctx.fillStyle = "black";
  //   positionX = Math.round(Math.random() * canvas.width);
  //   positionY = Math.round(Math.random() * canvas.height);
  //   ctx.fillRect(positionX, positionY, 100, 20);
  // }
}
const platform1 = new Platform();
const platform2 = new Platform();

window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "w":
      Player1.yspeed = -Player1.speed;
      Player1.playerState = "jump";
      break;
    case "s":
      Player1.yspeed = Player1.speed;
      break;
    case "a":
      Player1.xspeed = -Player1.speed;
      Player1.playerState = "run";
      break;
    case "d":
      Player1.xspeed = Player1.speed;
      Player1.playerState = "run";
      break;
    case "ArrowUp":
      Player2.yspeed = -Player2.speed;
      break;
    case "ArrowDown":
      Player2.yspeed = Player2.speed;
      break;
    case "ArrowLeft":
      Player2.xspeed = -Player2.speed;
      Player2.playerState = "run";
      break;
    case "ArrowRight":
      Player2.xspeed = Player2.speed;
      Player2.playerState = "run";
      break;
  }
});

window.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "w":
      Player1.yspeed = 0;
      Player1.playerState = "idle";
      break;
    case "s":
      Player1.yspeed = 0;
      Player1.playerState = "idle";
      break;
    case "a":
      Player1.xspeed = 0;
      Player1.playerState = "idle";
      break;
    case "d":
      Player1.xspeed = 0;
      Player1.playerState = "idle";
      break;
    case "ArrowUp":
      Player2.yspeed = 0;
      Player2.playerState = "idle";
      break;
    case "ArrowDown":
      Player2.yspeed = 0;
      Player2.playerState = "idle";
      break;
    case "ArrowLeft":
      Player2.xspeed = 0;
      Player2.playerState = "idle";
      break;
    case "ArrowRight":
      Player2.xspeed = 0;
      Player2.playerState = "idle";
      break;
  }
});
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
  ctx.fillRect(200, 200, 30, 200);
  Player1.animate(ctx);
  Player2.animate(ctx);
  if (Player1.y < canvas.height && Player1.x < canvas.width) {
    Player1.y += Player1.yspeed;
    Player1.x += Player1.xspeed;
  } else {
    Player1.yspeed = 0;
    Player1.xspeed = 0;
  }
  if (Player2.y < canvas.height && Player2.x < canvas.width) {
    Player2.y += Player2.yspeed;
    Player2.x += Player2.xspeed;
  } else {
    Player2.yspeed = 0;
    Player2.xspeed = 0;
  }
  window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);
