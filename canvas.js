// window.addEventListener('load', () => {
//     const canvas = document.querySelector('canvas');
//     const ctx = canvas.getContext('2d');

// // Resizing
// canvas.height = window.innerHeight;
// canvas.width = window.innerWidth;

// // Variables
// let painting = false;

// function startPosition(e) {
//     painting = true;
//     draw(e);
// }

// function finishedPosition() {
//     painting = false;
//     ctx.beginPath();
// }

// function draw(e) {
//     if (!painting) return;
//     ctx.lineWidth = 10;
//     ctx.lineCap = 'round';
//     ctx.strokeStyle = 'red';

//     ctx.lineTo(e.clientX, e.clientY);
//     ctx.stroke();
//     ctx.beginPath();
//     ctx.moveTo(e.clientX, e.clientY);

// }
// // Event Listeners
// canvas.addEventListener('mousedown', startPosition);
// canvas.addEventListener('mouseup', finishedPosition);
// canvas.addEventListener('mousemove', draw);

// // ctx.beginPath();
// // ctx.moveTo(100, 100);
// // ctx.lineTo(200, 100);
// // ctx.lineTo(200, 150);
// // ctx.closePath();
// // ctx.stroke();
// });

// // to make buttons to change width of stroke and color
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 2;
ctx.lineCap = "round";
ctx.filter = "blur(1px)"; // blur(px)
ctx.lineJoin = "round"; // round, bevel, miter

let isDrawing = false;
x = 0;
y = 0;

// start drawing
canvas.addEventListener("mousedown", (e) => {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
});

// draw
canvas.addEventListener("mousemove", (e) => {
  if (isDrawing === true) {
    drawLine(ctx, x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  }
});
// stop drawing
canvas.addEventListener("mouseup", (e) => {
  if ((isDrawing = true)) {
    drawLine(ctx, x, y, e.offsetX, e.offsetY);
    console.log(e);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

let myColor2 = 0;

function drawLine(ctx, x1, y1, x2, y2) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.strokeStyle = `hsl(${myColor2}, 100%, 50%, 1.0)`; // 0 - 360, 0 - 100, 0 - 100, 0 - 1
  myColor2 = (myColor2 + 1) % 360; // 0 - 360
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

// even listener for buttons

const btn = document.querySelector("#plusWidth");
const btn2 = document.querySelector("#minusWidth");
const btn3 = document.querySelector("#clearCanvas");
const btn4 = document.querySelector("#saveCanvas");

btn.addEventListener("click", (e) => {
  ctx.lineWidth = ctx.lineWidth + 1;
});

btn2.addEventListener("click", (e) => {
  ctx.lineWidth = ctx.lineWidth - 1;
});
btn3.addEventListener("click", (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
btn4.addEventListener("click", (e) => { // save canvas as image
    const link = document.createElement("a"); // create a link
    link.download = "canvas.png"; // file name
    link.href = canvas.toDataURL("image/png"); // base64
    link.click(); // download
})
// btn.addEventListener("click", myFunction(){
// console.log('Hello World');
// }); // when button is clicked
