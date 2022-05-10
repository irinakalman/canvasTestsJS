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
let coordinates = []; // to save mouse clicks to an array

let isDrawing = false;
x = 0;
y = 0;

// start drawing
canvas.addEventListener("mousedown", (e) => {
  x = e.offsetX; // x coordinate of the mouse
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

let myColor2 = 0; // 0 - 360

function drawLine(ctx, x1, y1, x2, y2) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.strokeStyle = `hsl(${myColor2}, 100%, 50%, 1.0)`; // 0 - 360, 0 - 100, 0 - 100, 0 - 1
  myColor2 = (myColor2 + 1) % 360; // 0 - 360
  ctx.moveTo(x1, y1); // defines the starting point of the line
  ctx.lineTo(x2, y2); // defines the ending point of the line
  ctx.stroke(); // draws the line
  ctx.closePath(); // closes the path after drawing 😋
  coordinates.push({ x1, y1, x2, y2 }); // saves the coordinates to an array
}

// Save the default state
ctx.save(0, 0, canvas.width, canvas.height);
// Restore the default state
// ctx.restore(0, 0, canvas.width, canvas.height);

// even listener for buttons

const btn = document.querySelector("#plusWidth");
const btn2 = document.querySelector("#minusWidth");
const btn3 = document.querySelector("#clearCanvas");
const btn4 = document.querySelector("#saveCanvas");
const btn5 = document.querySelector("#savetoLocalStorage"); // to save canvas to local storage
const btn6 = document.querySelector("#loadfromLocalStorage"); // reload canvas

btn.addEventListener("click", (e) => {
  ctx.lineWidth = ctx.lineWidth + 1;
});

btn2.addEventListener("click", (e) => {
  ctx.lineWidth = ctx.lineWidth - 1;
});
btn3.addEventListener("click", (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // starts at the upper-left corner and draws a rectangle of the specified width and height.
});
btn4.addEventListener("click", (e) => {
  // save canvas as image
  const link = document.createElement("a"); // create a link
  link.download = "canvas.png"; // file name
  link.href = canvas.toDataURL("image/png"); // base64
  link.click(); // download
});
btn5.addEventListener("click", (e) => {
  // save canvas to local storage
  localStorage.setItem("canvas", JSON.stringify(coordinates));
  console.log(localStorage.getItem("canvas")); // to see the array in the console
});
btn6.addEventListener("click", (e) => {
  // reload canvas
  coordinates = JSON.parse(localStorage.getItem("canvas"));
  isDrawing = true;
  coordinates.forEach((coordinate) => {
    // to draw the array
    drawLine(ctx, coordinate.x1, coordinate.y1, coordinate.x2, coordinate.y2); // drawLine(ctx, x1, y1, x2, y2);
  });
  isDrawing = false;
});

// btn.addEventListener("click", myFunction(){
// console.log('Hello World');
// }); // when button is clicked

// draw a circle

// ctx.beginPath();
// ctx.arc(65, 40, 30, 0, 2 * Math.PI);
// ctx.stroke();

// text on canvas
// ctx.font = "30px Arial";
// ctx.fillText("Hello World", 10, 50);
