  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDxxW4x-c2nTDp0oyhKhId1FNNdelGwYX8",
    authDomain: "group-2a92e.firebaseapp.com",
    databaseURL: "https://group-2a92e.firebaseio.com",
    projectId: "group-2a92e",
    storageBucket: "group-2a92e.appspot.com",
    messagingSenderId: "867800674419"
  };
  firebase.initializeApp(config);
  
  const db = firebase.database();

//===== Initialize Page =============================================================

$(document).ready(function() {
  // Get a snapshot of all the values to apply to the various inputs
  db.ref().once('value', function(snap) {
    var sv = snap.val();
    $('#enableWeather').prop('checked', sv.weatherOn);
    $('#enableClock').prop('checked', sv.clockOn);
    $('#enableQuote').prop('checked', sv.quoteOn);
    $('#digitalAnalogVal').val(sv.clockStyle);
    $('#milTimeVal').val(sv.digitalClockStyle);
    if (sv.clockStyle === 'analog') {
      $('#milTimeVal').prop('disabled', 'disabled');
    }
  })


//===== Event Listeners ==============================================================

  // When the weather button is clicked, read the location and update the DB
  $('#submitWeather').on('click', function() {
    event.preventDefault();
    if ($('#myLocation').val().trim()) {
      var myLoc = $('#myLocation').val().trim();
      var clockOn = $('#clockEnable').val();
      db.ref('location').set(myLoc);
      $('#myLocation').val(null);
    }
    db.ref('weatherOn').set($('#enableWeather').prop('checked'));
  })

  // When the Clock submit button is clicked, collect the selections and set them to the DB
  $('#submitClock').on('click', function() {
    event.preventDefault();
    db.ref('clockStyle').set($('#digitalAnalogVal').val());
    db.ref('digitalClockStyle').set($('#milTimeVal').val());
    db.ref('clockOn').set($('#enableClock').prop('checked'));
  })

  // When the Quote submit button is clicked, collect the selections and set them to the DB
  $('#submitQuote').on('click', function() {
    event.preventDefault();
    db.ref('quoteOn').set($('#enableQuote').prop('checked'));
  })

  // When clock style 'digital' is selected, enable the option for 12-hour / military time
  $('#digitalAnalogVal').on('change', function() {
    var style = $('#digitalAnalogVal').val();
    if (style === "analog") {
      $('#milTimeVal').prop('disabled', 'disabled');
    }
    else if (style === 'digital') {
      $('#milTimeVal').prop('disabled', false);
    }
  })

//===== Database Listeners ==========================================================

  // NEEDS WORK - Should read changes to 'locationReturned'
  db.ref().on('value', function(snap) {
    var sv = snap.val();
    console.log(sv.location);
    // Update the weather ap to display the current location
    $('#currentLoc').text("Current Location: " + sv.location);
  })

})