//massa kooood
// requestAnimationFrame(func) anropa först i kod och sen i själva ritfunction

//CANVAS
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let xPos = 200;
let yPos = 200;

let speed = 7;
let xspeed = 0;
let yspeed = 0;

const size = 25;

function animate() {
  xPos += xspeed;
  yPos += yspeed;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, size, size);
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
