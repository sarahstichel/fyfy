const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Laddar sprite sheet
const spriteSheet = new Image();
spriteSheet.src = "Player1_Idle.png";

// Variabler för spritens storlek
const spriteWidth = 120;
const spriteHeight = 80;

// frameIndex håller reda på vilken frame som ska ritas.
let frameIndex = 0;
//totalFrames är hur många frames animationen är, det kan variera mellan olika animationer
const totalFrames = 8;

const scale = 2;

// De här används för att "throttla" animationen så att den inte går för fort.
let lastTimestamp = 0,
  maxFPS = 15,
  timestep = 1000 / maxFPS; // ms for each frame

/**
 * timestamp är en inparameter som skickas in i funktionen av requestAnimationFrame()
 */
function draw(timestamp) {
  //if-sats för "throttling". För att det inte ska bli för hög FPS
  if (timestamp - lastTimestamp < timestep) {
    // Vi ska vänta med att rita så vi avbryter funktionen.
    requestAnimationFrame(draw);
    return;
  }
  // OK, dags att rita!
  lastTimestamp = timestamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Tömmer canvasen

  // Ritar den frame som är på frameIndex med skalan i scale
  ctx.drawImage(
    spriteSheet,
    frameIndex * spriteWidth, // Beräknar framens x-koordinat
    40, // Framens y-koordinat är alltid 0
    spriteWidth,
    spriteHeight,
    0, // Ritar på x-koordinat 0 på canvas
    0, // Ritar på y-koordinat 0 på canvas
    spriteWidth * scale,
    spriteHeight * scale
  );

  // Se till att frameIndex inte blir högre än antalet frames. Börja om på frame 0 i så fall.
  frameIndex = (frameIndex + 1) % totalFrames;
  requestAnimationFrame(draw);
}

// Startar animationen när bilden laddats.
spriteSheet.onload = requestAnimationFrame(draw);
