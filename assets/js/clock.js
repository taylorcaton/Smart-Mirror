document.addEventListener("DOMContentLoaded", function() {
  startTimer();
});

var timeFormat = "12Hour";
var timeCorrected = false;
var dbTime = "";

function getTime(input){
  var localTime = moment();
  var h = localTime.hour();
  var m = localTime.minutes();
  var s = localTime.seconds()
  var dow = localTime.isoWeekday();
  var timeString = formatHour(h) + ":" + padZero(m) + " " + getTimePeriod(h);
  console.log(timeString);
}

function hourCorrection(timeZone){
  console.log("hourCorrection() is " + timeZone);
  if(timeZone === "America/New_York"){
    timeZoneOffset = -4;
  } else if(timeZone === "America/Chicago"){
    timeZoneOffset = -5;
  } else if(timeZone === "America/Denver"){
    timeZoneOffset = -6;
  }
  else if(timeZone === "America/Los_Angeles"){
    timeZoneOffset = -7;
  } else {
    timeZoneOffset = 0;
    console.log("Timezone is unrecognized. Time is in UTC +0")
  }
  // displayTime(timeZoneOffset);
  return timeZoneOffset
}

function dayCorrection(hourCheck, dayCheck){
  hour = hourCheck;
  day = dayCheck;
  if(hour <= 0){
    // console.log("oops the day rolled");
    day --;
    hour = 24 + hour;
  } else {
    return day;
  }
  return day;
}

function dayHourCorrection(hourCheck, dayCheck){
  hour = hourCheck;
  day = dayCheck;
  if(hour <= 0){
    // console.log("oops the day rolled");
    day --;
    hour = 24 + hour;
  } else {
    return hour;
  }
  return hour;
}

// I should make an array to hold the day of weeks
function dowCorrection(hourCheck, dowOffest){
  hour = hourCheck;
  dow = dowCheck;
  if(hour <= 0){
    // console.log("oops the day rolled");
    day --;
    hour = 24 + hour;
  } else {
    return hour;
  }
  return dow;
}

function displayTime(offset){
  // Inital Variables
  var time = moment.utc();
  var tzOffset = hourCorrection(dbTimeZone);
  var hour = time.hour();
  var hourOffset = parseInt(hour) + parseInt(tzOffset);
  var minute = time.minutes();
  var second = time.seconds();
  var year = time.year();
  var month = time.month();
  var day = time.date();
  var dayOfWeek = time.isoWeekday();
  var dayOffset = dayCorrection(hourOffset, day);
  var dayHourOffset = dayHourCorrection(hourOffset, day);
  var checkedDay = /[^,]*/.exec(dayOffset)[0];
  var checkedDayHour = /[^,]*/.exec(dayHourOffset)[0];
  var timeString12Hour = formatHour(checkedDayHour) + ":" + padZero(minute) + " " + getTimePeriod(checkedDayHour);
  var timeString24Hour = padZero(checkedDayHour) + ":" + padZero(minute);
  var dateString = formatDayOfWeek(dayOfWeek) + " " + formatMonth(month) + " " + checkedDay + ", " + year;

  // Set Clock on html
  $("#digitalClock").empty();
  $("#digitalClock").append(dateString);
  //$("#digitalClock").prepend($("<br>"));
  var digital = $('<div>').attr('id', 'digitalTime');
  if(timeFormat === "12Hour"){
    $("#digitalClock").prepend(digital.text(timeString12Hour));
  } else {
    $("#digitalClock").prepend(timeString24Hour);
  }
  // Creating the Analog Clock
  var canvas = document.querySelector("#analogClock");
  var context = canvas.getContext('2d');
  drawClockFace("#000000", "#ffffff"); // Clock Face
  var contextHands = canvas.getContext("2d");
  var contextClock = canvas.getContext("2d");
  var clockRadius = 100;
  var secHandLength = 60;
  // Define center of clock
  var clockX = canvas.width / 2;
  var clockY = canvas.height / 2;
    contextClock.beginPath();
    contextClock.arc(clockX, clockY, 97, 0 * Math.PI, 2 * Math.PI);
    contextClock.fillStyle = "#000000";
    contextClock.fill();
    contextClock.lineWidth = 3;
    contextClock.strokeColor = "#ffffff";
    contextClock.stroke();

  // Create clock face
  function drawClockFace(fill, outline){
  }// End drawClockFace()

  // Create Hour Hands
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

  function drawNotches() {
    for (var i = 0; i < 12; i++) {
      angle = (i - 3) * (Math.PI * 2) / 12; // Creates the Angle for the hour notches
      context.lineWidth = 2; // Defines the notch width
      context.beginPath();

      var x1 = (canvas.width / 2) + Math.cos(angle) * (secHandLength * 1.5);
      var y1 = (canvas.height / 2) + Math.sin(angle) * (secHandLength * 1.5);
      var x2 = (canvas.width / 2) + Math.cos(angle) * (secHandLength - (secHandLength / 24));
      var y2 = (canvas.height / 2) + Math.sin(angle) * (secHandLength - (secHandLength / 24));

      context.moveTo(x1, y1);
      context.lineTo(x2, y2);

      context.strokeStyle = '#ffffff';
      context.stroke();
    }
  }// End drawNotches()

  // Clear the canvas then draw the current arms
  contextHands.clearRect(0, 0, canvas.width, canvas.height);
  contextClock.clearRect(0, 0, canvas.width, canvas.height);
  drawArm(hourOffset / 12, 6, 0.50, "#ffffff"); // Hour
  drawArm(minute / 60,  4, 0.75, "#ffffff"); // Minute
  drawArm(second / 60,  2, 1.00, "#ffffff"); // Second
  drawNotches()

  return time;
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

function formatDayOfWeek(dayCheck){
  var day = dayCheck;
  switch(day){
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    case 7:
      day = "Sunday";
  }
  return String(day);
}// end formatDayOfWeek()

function formatMonth(monthCheck){
  var month = monthCheck;
  switch(month){
    case 1:
      month = "January";
      break;
    case 2:
      month = "February";
      break;
    case 3:
      month = "March";
      break;
    case 4:
      month = "April";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "June";
      break;
    case 7:
      month = "July";
      break;
    case 8:
      month = "August";
      break;
    case 9:
      month = "September";
      break;
    case 10:
      month = "October";
      break;
    case 11:
      month = "November";
      break;
    case 12:
      month = "December"; 
  }
  return String(month);
}// end formatMonth()

function startTimer(){

  setInterval(displayTime, 1000);
  $('#clockPane').fadeOut('slow');
  displayTime();
  $('#clockPane').fadeIn('slow');
} // end startTimer()

function showDigitalClock(){
  $("#digitalClock").show();
  $("#analogClock").hide();
} // end showDigitalClock()

function showAnalogClock(){
  $("#analogClock").show();
  $("#digitalClock").hide();
  timeFormat = "12Hour";
} // end showAnalogClock()

function show24HourTime(){
  timeFormat = "24Hour";
} // end show24HoutTime()

function show12HourTime(){
  timeFormat = "12Hour"
} // end show12HourTime()
