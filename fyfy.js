class Player {
  constructor(color, xPos, yPos, num) {
    //Skapar Player elemenst
    this.name = "";
    this.hp = 100;
    this.strength = 3;
    this.medkit = 0;
    this.strengthPotion = 0;
    this.color = color;
    this.x = xPos;
    this.y = yPos;
    this.speed = 10;
    this.yspeed = 0;
    this.xspeed = 0;
    this.number = num;
  }
  useMedkit() {
    if (this.medkit > 0) {
      this.hp += medkitPower;
      this.medkit -= 1;
    }
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 25, 25);
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

//Här börjar Sprite-klassen
class Sprite {
  constructor(frames, width, photo) {
    this.spriteHeight = 80;
    this.spriteWidth = width;
    this.spriteSheet = new Image();
    this.frameIndex = 0;
    this.totalFrames = frames;
    this.photo = photo;
    this.scale = 2;
  }

  draw(ctx) {
    this.spriteSheet.src = this.photo;
    ctx.drawImage(
      this.spriteSheet,
      this.frameIndex * this.spriteWidth, // Beräknar framens x-koordinat
      40, // Framens y-koordinat
      this.spriteWidth,
      this.spriteHeight,
      0, // Ritar på x-koordinat 0 på canvas
      0, // Ritar på y-koordinat 0 på canvas
      this.spriteWidth * this.scale,
      this.spriteHeight * this.scale
    );
  }
}
//Defenition av medkit och strength potion
const medkitPower = 20;
const strengthPotionPower = 5;
//Spelare 1
const Player1 = new Player("black", 100, 400, 1);
const Player2 = new Player("blue", 1100, 400, 2);

const Idle = new Sprite(8, 120, "Player1_Idle.png");
//CANVAS
let canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 3.01; //Annars är canvas för stor
const ctx = canvas.getContext("2d");

const backgroundImage = new Image(); //Skapar en ny variabel som är bild
backgroundImage.src = "theme.png"; //Bilden source är theme.png

class Platform {
  draw(ctx) {
    ctx.fillStyle = "black";
    positionX = Math.round(Math.random() * canvas.width);
    positionY = Math.round(Math.random() * canvas.height);
    ctx.fillRect(positionX, positionY, 100, 20);
  }
}
const platform1 = new Platform();
const platform2 = new Platform();

window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "w":
      Player1.yspeed = -Player1.speed;
      // Player1.Sprite.Jump(ctx);
      break;
    case "s":
      Player1.yspeed = Player1.speed;
      break;
    case "a":
      Player1.xspeed = -Player1.speed;
      break;
    case "d":
      Player1.xspeed = Player1.speed;
      break;
    case "ArrowUp":
      Player2.yspeed = -Player2.speed;
      break;
    case "ArrowDown":
      Player2.yspeed = Player2.speed;
      break;
    case "ArrowLeft":
      Player2.xspeed = -Player2.speed;
      break;
    case "ArrowRight":
      Player2.xspeed = Player2.speed;
      break;
  }
});

window.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "w":
      Player1.yspeed = 0;
      break;
    case "s":
      Player1.yspeed = 0;
      break;
    case "a":
      Player1.xspeed = 0;
      break;
    case "d":
      Player1.xspeed = 0;
      break;
    case "ArrowUp":
      Player2.yspeed = 0;
      break;
    case "ArrowDown":
      Player2.yspeed = 0;
      break;
    case "ArrowLeft":
      Player2.xspeed = 0;
      break;
    case "ArrowRight":
      Player2.xspeed = 0;
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
  ctx.fillRect(200, 200, 50, 50);
  Player1.draw(ctx);
  Player2.draw(ctx);
  Idle.draw(ctx);
  Player1.y += Player1.yspeed;
  Player1.x += Player1.xspeed;
  Player2.y += Player2.yspeed;
  Player2.x += Player2.xspeed;

  window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);
