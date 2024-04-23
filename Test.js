let playerState = "idle";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const playerIdleImg = new Image();
playerIdleImg.src = "Player1_Idle.png";
const playerJumpImg = new Image();
playerJumpImg.src = "Player1_Jump.png";
const animationStates = {
  idle: {
    name: "idle",
    image: playerIdleImg,
    frames: 10,
  },
  jump: {
    name: "jump",
    image: playerJumpImg,
    frames: 3,
  },
};

const spriteWidth = 120;
const spriteHeight = 80;

for (const state in animationStates) {
  let frames = {
    loc: [],
  };
  let index = 0;
  for (let j = 0; j < animationStates[state].frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[animationStates[state].name] = frames;
}
// animationStates.forEach((state, index) => {
//   let frames = {
//     loc: [],
//   };
//   for (let j = 0; j < state.frames; j++) {
//     let positionX = j * spriteWidth;
//     let positionY = index * spriteHeight;
//     frames.loc.push({ x: positionX, y: positionY });
//   }
//   spriteAnimations[state.name] = frames;
// });
console.log(spriteAnimations);

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;

  ctx.drawImage(
    animationStates[playerState].image,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
