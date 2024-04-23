//CANVAS
let canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 3.01; //Annars är canvas för stor
const ctx = canvas.getContext("2d");

const backgroundImage = new Image(); //Skapar en ny variabel som är bild
backgroundImage.src = "theme.png"; //Bilden source är theme.png
//Skapar Player elemenst
class Player {
  constructor(color, xPos, yPos, num) {
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

//Här börjar Sprite

//Defenition av medkit och strength potion
const medkitPower = 20;
const strengthPotionPower = 5;
//Spelare 1
const Player1 = new Player("black", 100, 400, 1);
const Player2 = new Player("blue", 1100, 400, 2);

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
  ctx.fillRect(200, 200, 30, 200);
  Player1.draw(ctx);
  Player2.draw(ctx);

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
