//massa kooood
// requestAnimationFrame(func) anropa först i kod och sen i själva ritfunction

//CANVAS
let canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 3.01; //Annars är canvas för stor
const ctx = canvas.getContext("2d");

const backgroundImage = new Image(); //Skapar en ny variabel som är bild
backgroundImage.src = "theme.png"; //Bilden source är theme.png

// window.onload = function () {   //funktion för att uppdatera sidan konstant
//   const canvas = document.getElementById("myCanvas");
//   const ctx = canvas.getContext("2d");
//   const img = document.getElementById("theme");
//   ctx.drawImage(img, 0, 0);
// };

let xPos = canvas.width / 2;
let yPos = canvas.height / 2;

let speed = 7;
let xspeed = 0;
let yspeed = 0;

const size = 25;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Töm skärmen
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // Rita bakgrunden

  document.onkeydown = function (e) {
    let key = e.key;
    switch (key) {
      case "w":
        yspeed = -speed;
        break;
      case "s":
        yspeed = speed;
        break;
      case "a":
        xspeed = -speed;
        break;
      case "d":
        xspeed = speed;
    }
  };

  xPos += xspeed;
  yPos += yspeed;

  ctx.fillStyle = "black";
  ctx.fillRect(xPos, yPos, size, size);
  window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);

const medkitPower = 20;
const strengthPotionPower = 5;
class Player {
  name = "";
  hp = 100;
  strength = 3;
  medkit = 0;
  strengthPotion = 0;
  speed = 2;
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
}
//Spelare 1
const Player1 = new Player();
const Player2 = new Player();

Player1.name = "Taras";
Player2.name = "Sarah";

console.log(Player1.Player2);
Player1.attack(Player2);
