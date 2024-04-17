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
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 25, 25);
  }

  useMedkit() {
    if (this.medkit > 0) {
      this.hp += medkitPower;
      this.medkit -= 1;
    }
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

//Spelare 1
const Player1 = new Player("black", 100, 400, 1);
const Player2 = new Player("blue", 1100, 400, 2);

//CANVAS
let canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 3.01; //Annars är canvas för stor
const ctx = canvas.getContext("2d");

const backgroundImage = new Image(); //Skapar en ny variabel som är bild
backgroundImage.src = "theme.png"; //Bilden source är theme.png
function rutor() {
  ctx.fillStyle = "black";
  ctx.drawRect(Math.random() * canvas.width, Math.random() * canvas.height);
}

let xPos = canvas.width / 2;
let yPos = canvas.height / 2;

const size = 25;

const medkitPower = 20;
const strengthPotionPower = 5;

window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "w":
      Player1.yspeed = -Player1.speed;
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

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Töm skärmen
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // Rita bakgrunden
  Player1.draw(ctx);
  Player2.draw(ctx);
  Player1.y += Player1.yspeed;
  Player1.x += Player1.xspeed;
  Player2.y += Player2.yspeed;
  Player2.x += Player2.xspeed;
  window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);

function saker() {
  ctx.fillRect(0, 431, 337, canvas.height);
}
