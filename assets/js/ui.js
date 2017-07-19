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

  $('#submit').on('click', function() {
    event.preventDefault();
    // read and set weather inputs
    if ($('#myLocation').val().trim()) {
      var myLoc = $('#myLocation').val().trim();
      var weatherOn = $('#weatherEnable').val();
      db.ref('location').set(myLoc);
      $('#myLocation').val(null);
    }
    db.ref('weatherOn').set($('#enableWeather').prop('checked'));

    // read and set clock inputs
    db.ref('clockStyle').set($('#digitalAnalogVal').val());
    db.ref('digitalClockStyle').set($('#milTimeVal').val());
    db.ref('clockOn').set($('#enableClock').prop('checked'));
    
    //read and set the news inputs

    // read and set the quote inputs
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
    console.log(sv.locationName);
    // Update the weather ap to display the current location
    $('#currentLoc').text("Current Location: " + sv.locationName);
  })

})