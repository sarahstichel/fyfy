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
    this.speed = 2;
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

let xPos = canvas.width / 2;
let yPos = canvas.height / 2;

let speed = 5;
let xspeed = 0;
let yspeed = 0;

const size = 25;

const medkitPower = 20;
const strengthPotionPower = 5;

function move(player, player2) {
  document.onkeydown = function (e) {
    let key = e.key;
    switch (player.number) {
      case player.number == 1:
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
      case player2.number == 2:
        switch (key) {
          case "i":
            player2.yspeed = -player2.speed;
            console.log(player2.yspeed);
            break;
          case "k":
            player2.yspeed = player2.speed;
            break;
          case "j":
            player2.xspeed = -player2.speed;
            break;
          case "l":
            player2.xspeed = player2.speed;
            break;
        }
    }
    console.log("Postion", player.x, player.y);
    console.log("Postion", player2.x, player2.y);
    player.y += player.yspeed;
    player.x += player.xspeed;
    player2.y += player2.yspeed;
    player2.x += player2.xspeed;
  };
  document.onkeyup = function (e) {
    let key = e.key;
    switch (player.number) {
      case player.number == 1:
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
      case player2.number == 2:
        switch (key) {
          case "i":
            player2.yspeed = 0;
            break;
          case "k":
            player2.yspeed = 0;
            break;
          case "j":
            player2.xspeed = 0;
            break;
          case "l":
            player2.xspeed = 0;
            break;
        }
    }
  };
}
//Move-funktion slut

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Töm skärmen
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // Rita bakgrunden
  Player1.draw(ctx);
  Player2.draw(ctx);
  move(Player1, Player2);
  window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);

function saker() {
  ctx.fillRect(0, 431, 337, canvas.height);
}
