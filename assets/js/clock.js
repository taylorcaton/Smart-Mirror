document.addEventListener("DOMContentLoaded", function() {
  startTimer();
});

function displayTime(){

  var time = new Date();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();

  var timeString = formatHour(hour) + ":" + padZero(minute) + ":" + padZero(second) + " " + getTimePeriod(hour);

  document.querySelector("#digitalClock").innerHTML = timeString;

  // Creating the Analog Clock
  var canvas = document.querySelector("#analogClock");
  var contextHands = canvas.getContext("2d");
  var contextClock = canvas.getContext("2d");
  var clockRadius = 100;

  // Define center of clock
  var clockX = canvas.width / 2;
  var clockY = canvas.height / 2;

  // Create clock face
  function drawClockFace(fill, outline){
    // Not Working
    contextClock.beginPath();
    contextClock.arc(clockX, clockY, 97, 0 * Math.PI, 2 * Math.PI);
    contextClock.fillStyle = fill;
    contextClock.fill();
    contextClock.lineWidth = 3;
    contextClock.strokeColor = outline;
    contextClock.stroke();
  }// End drawClockFace()

  // Create Hour Hand
  Math.TAU = 2 * Math.PI;

  function drawArm(progress, armThickness, armLength, armColor) {
    // Functioning Correctly
    var armRadians = (Math.TAU * progress) - (Math.TAU/4);
    var targetX = clockX + Math.cos(armRadians) * (armLength * clockRadius);
    var targetY = clockY + Math.sin(armRadians) * (armLength * clockRadius);

    contextHands.lineWidth = armThickness;
    contextHands.strokeStyle = armColor;

    contextHands.beginPath(); // Get ready to draw
    contextHands.moveTo(clockX, clockY); // Start at the center
    contextHands.lineTo(targetX, targetY); // Draw a line outwards
    contextHands.stroke();
  }// End drawArm()

  // Clear the canvas then draw the current arms
  // Functioning Correctly
  contextHands.clearRect(0, 0, canvas.width, canvas.height);
  contextClock.clearRect(0, 0, canvas.width, canvas.height);
  drawClockFace("#000000", "#ffffff"); // Clock Face
  drawArm(hour / 12, 6, 0.50, '#ffffff'); // Hour
  drawArm(minute / 60,  4, 0.75, '#ffffff'); // Minute
  drawArm(second / 60,  2, 1.00, '#ffffff'); // Second
} // end displayTime()

function padZero(num) {
  if (num < 10) { 
    return "0" + String(num);
  }
  else {
  return String(num);
  }
} // end padZero()

function formatHour(h) {
  var hour = h % 12;

  if (hour == 0) { 
  hour = 12; 
  }

  return String(hour)
} // end formatHour()

function getTimePeriod(h) {
  return (h < 12) ? "AM" : "PM"; 
} // end getTimePeriod

function startTimer(){
  setInterval(displayTime, 1000);
  displayTime();
} // end startTimer()