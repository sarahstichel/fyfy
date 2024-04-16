const medkitPower = 20;
const strengthPotionPower = 5;

class Player {
  constructor(color, xPos, yPos) {
    this.name = "";
    this.hp = 100;
    this.strength = 3;
    this.medkit = 0;
    this.strengthPotion = 0;
    this.color = color;
    this.x = xPos;
    this.y = yPos;
    this.speed = 2;
    this.yspeed = 0;
    this.xspeed = 0;
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

function move(player) {
  document.onkeydown = function (e) {
    let key = e.key;
    switch (key) {
      case "w":
        player.yspeed = -player.speed;
        console.log(player.yspeed);
        break;
      case "s":
        player.yspeed = player.speed;
        break;
      case "a":
        player.xspeed = -player.speed;
        break;
      case "d":
        player.xspeed = player.speed;
        break;
    }
    console.log("Postion", player.x, player.y);
    player.y += player.yspeed;
    player.x += player.xspeed;
  };
  document.onkeyup = function (e) {
    let key = e.key;
    switch (key) {
      case "w":
        player.yspeed = 0;
        break;
      case "s":
        player.yspeed = 0;
        break;
      case "a":
        player.xspeed = 0;
        break;
      case "d":
        player.xspeed = 0;
        break;
    }
  };
}
//Move-funktion slut

function saker() {
  //döp om den snälla!!!
  //Jag e bääääst och älskar därför choklad, och cjhoklad älskar miiiiig!!!!!!!!!! /Linneaaaa

  ctx.fillRect(0, 431, 337, canvas.height);
}

//Spelare 1
const Player1 = new Player("black", 100, 400);
const Player2 = new Player("blue", 1100, 400);

Player1.name = "Taras";
Player2.name = "Sarah";

//CANVAS
let canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 3.01; //Annars är canvas för stor
const ctx = canvas.getContext("2d");

const backgroundImage = new Image(); //Skapar en ny variabel som är bild
backgroundImage.src = "theme.png"; //Bilden source är theme.png

let xPos = canvas.width / 2;
let yPos = canvas.height / 2;

const size = 25;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Töm skärmen
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // Rita bakgrunde
  Player1.draw(ctx);
  move(Player1);

  //   document.onkeydown = function (e) {
  //     let key = e.key;
  //     switch (key) {
  //       case "w":
  //         Player1.yspeed = -this.speed;
  //         break;
  //       case "s":
  //         Player1.yspeed = this.speed;
  //         break;
  //       case "a":
  //         Player1.xspeed = -this.speed;
  //         break;
  //       case "d":
  //         Player1.xspeed = this.speed;
  //         break;
  //     }
}

function collisionDetection() {}

window.requestAnimationFrame(animate);

window.requestAnimationFrame(animate);
