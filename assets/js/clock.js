document.addEventListener("DOMContentLoaded", function() {
  startTimer();
});

// Initial Values
var timeFormat;
var timeCorrected = false;

// Function to solve which Timezone the weather is getting pulled from. This will create the offset
// that will correct the time from UTC time, to local time. We could use the local time from the 
// API call, but we would hit a limit of our API Calls.
function hourCorrection(timeZone){
  // console.log("hourCorrection() is " + timeZone);
  if(timeZone === ""){
    timeZoneOffset = 0;
  } else if(timeZone === "Europe/Madrid"){
    timeZoneOffset = -1;
  } else if(timeZone === "Atlantic/Cape_Verde"){
    timeZoneOffset = -2;
  } else if(timeZone === "Indian/Reunion"){
    timeZoneOffset = -3;
  } else if(timeZone === "America/New_York"){
    timeZoneOffset = -4;
  } else if(timeZone === "America/Chicago"){
    timeZoneOffset = -5;
  } else if(timeZone === "America/Denver"){
    timeZoneOffset = -6;
  } else if(timeZone === "America/Los_Angeles"){
    timeZoneOffset = -7;
  } else if(timeZone === "America/Anchorage"){
    timeZoneOffset = -8;
  } else if(timeZone === "Pacific/Marquesas"){
    timeZoneOffset = -9;
  } else if(timeZone === "Pacific/Gambier"){
    timeZoneOffset = -10;
  } else if(timeZone === "Pacific/Pago_Pago"){
    timeZoneOffset = -11;
  } else if(timeZone === "Asia/Jakarta"){
    timeZoneOffset = -12;
  } else if(timeZone === "Pacific/Auckland"){
    timeZoneOffset = +14;
  } else if(timeZone === "Pacific/Tarawa"){
    timeZoneOffset = +13;
  } else if(timeZone === "Pacific/Tongatapu"){
    timeZoneOffset = +12;
  } else if(timeZone === "Pacific/Efate"){
    timeZoneOffset = +11;
  } else if(timeZone === "Asia/Vladivostok"){
    timeZoneOffset = +10;
  } else if(timeZone === "Asia/Tokyo"){
    timeZoneOffset = +9;
  } else if(timeZone === "Asia/Shanghai" || timeZone === "Asia/Manila"){
    timeZoneOffset = +8;
  } else if(timeZone === "Asia/Jakarta"){
    timeZoneOffset = +7;
  } else if(timeZone === "Asia/Almaty"){
    timeZoneOffset = +6;
  } else if(timeZone === "Asia/Tashkent"){
    timeZoneOffset = +5;
  } else if(timeZone === "Asia/Yerevan"){
    timeZoneOffset = +4;
  } else if(timeZone === "Asia/Bahrain"){
    timeZoneOffset = +3;
  } else if(timeZone === "Europe/Tirane"){
    timeZoneOffset = +2;
  } else if(timeZone === "Africa/Algiers"){
    timeZoneOffset = +1;
  } else {
    timeZoneOffset = 0;
    console.log("Timezone is unrecognized. Time is in UTC +0")
  }
  // displayTime(timeZoneOffset);
  return timeZoneOffset
}

// Function that will correct the day if the timeZoneOffset has caused the day to roll back.
function dayCorrection(hourCheck, dayCheck){
  hour = hourCheck;
  day = dayCheck;
  if(hour <= 0){
    // console.log("Day Rolled Backwards");
    day--;
    dayOfWeek--;
    hour = 24 + hour;
  } else if(hour > 24){
    // console.log("Day Rolled Forward");
    day++;
  }  else {
    return day;
  }
  return day;
}

// Function will correct the hour from being negative if it rolls under 0, by adding 24 to the 
// negative number, giving you the 24 hour value of the prior day.
function dayHourCorrection(hourCheck, dayCheck){
  hour = hourCheck;
  day = dayCheck;
  if(hour <= 0){
    dayOfWeekOffset = 1;
    hour = 24 + hour; 
  } else if(hour > 24){
    hour = hour - 24; 
  } else {
    dayOfWeekOffset = -1;
    return hour;
  }
  return hour;
}

// Function to correct the day of the week.
function dowCorrection(hourCheck, offset){
  hour = hourCheck;
  dow = offset;
  if(hour <= 0){
    // console.log("Day Rolled Backwards");
    dow--;
  } else if(hour > 24){
    console.log("Day Rolled Forward");
    dow++;
  }  else {
    return offset;
  }
  return offset;
}


// Function that pulls the time from moment.js of the time right now in UTC +0.
function displayTime(offset){
  // Inital Variables
  var time = moment.utc(); // Pulls current time in UTC.
  var tzOffset = hourCorrection(dbTimeZone); // Gets timezone offset from database timeZone entry, then runs through the hour correction function
  var hour = time.hour(); // Gets current hour
  var hourOffset = parseInt(hour) + parseInt(tzOffset); // offsets hour by adding the timezone Offset
  var dayHourOffset = dayHourCorrection(hourOffset, day); // If time is over 24 or under 0 it will correct the time, them affect the day accordingly.
  var minute = time.minutes(); // Gets current minute
  var second = time.seconds(); // Gets current seconds
  var day = time.date(); // Gets current day
  var dayOffset = dayCorrection(hourOffset, day); // Corrected day if hour was above 24 or under 0
  var month = time.month(); // Gets current month
  var year = time.year(); // Gets current year
  var dayOfWeek = time.isoWeekday(); // Gets current day of week
  var dayOfWeekOffset = dowCorrection(hourOffset, dayOfWeek);
  var dayOfWeekCorrection = dayOfWeek + dayOfWeekOffset; //dowCorrection(hour, dayOfWeek); // Corrected day of week if hour was above 24 or under 0
  var timeString12Hour = formatHour(dayHourOffset) + ":" + padZero(minute) + " " + getTimePeriod(dayHourOffset);
  var timeString24Hour = padZero(dayHourOffset) + ":" + padZero(minute);
  var dateString = formatDayOfWeek(dayOfWeek) + " " + formatMonth(month) + " " + dayOffset + ", " + year;
  
  // Set Clock on html
  $("#digitalClock").empty();
  $("#digitalClock").append(dateString);
  var digital = $('<div>').attr('id', 'digitalTime');
  if(timeFormat === "12Hour"){
    $("#digitalClock").prepend(digital.text(timeString12Hour));
  } else {
    $("#digitalClock").prepend(digital.text(timeString24Hour));
  }

  // Creating the Analog Clock
  var canvas = document.querySelector("#analogClock");
  var context = canvas.getContext('2d');
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
} // end showAnalogClock()

function show24HourTime(){
  timeFormat = "24Hour";
} // end show24HoutTime()

function show12HourTime(){
  timeFormat = "12Hour"
} // end show12HourTime()

db.ref('digitalClockStyle').on('value', function(snap) {
  if (snap.val() === 'twelveHour') {
    show12HourTime();
  } else if (snap.val() ==='military') {
    show24HourTime();
  }
})