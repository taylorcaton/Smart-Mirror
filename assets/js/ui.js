//===== Initialize Page =============================================================

let firstLoad = true;

$(document).ready(function() {
  // Get a snapshot of all the values to apply to the various inputs
  db.ref().once('value', function(snap) {
    var sv = snap.val();
    // weather
    $('#enableWeather').prop('checked', sv.weatherOn);
    // clock
    $('#enableClock').prop('checked', sv.clockOn);
    $('#digitalAnalogVal').val(sv.clockStyle);
    $('#milTimeVal').val(sv.digitalClockStyle);
    if (sv.clockStyle === 'analog') {
      $('#milTimeVal').prop('disabled', 'disabled');
    }    
    // quote   
    $('#enableQuote').prop('checked', sv.quoteOn);
    // news
    $('#newsSourceVal').val(sv.newsSource);
    // colors
    $("[value='" + sv.color +"']").prop('checked', true);
  })


//===== Event Listeners ==============================================================

  $('#submit').on('click', function() {
    event.preventDefault();
    $('#submit').removeClass('unsaved');
    // read and set weather inputs
    if ($('#myLocation').val().trim()) {
      var myLoc = $('#myLocation').val().trim();
      var weatherOn = $('#weatherEnable').val();
      getWeatherUI(myLoc);
      $('#myLocation').val(null);
    }
    db.ref('weatherOn').set($('#enableWeather').prop('checked'));

    // read and set clock inputs
    db.ref('clockStyle').set($('#digitalAnalogVal').val());
    db.ref('digitalClockStyle').set($('#milTimeVal').val());
    db.ref('clockOn').set($('#enableClock').prop('checked'));
    
    //read and set the news inputs
    db.ref('newsSource').set($('#newsSourceVal').val());

    // read and set the quote inputs
    db.ref('quoteOn').set($('#enableQuote').prop('checked'));

    //read and set the color selection
    console.log($('.color:checked').val());
    db.ref('color').set($('.color:checked').val());
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

  // Watch all input fields and highlight the 'apply' once something changes
  $('.watch').on('change', function() {
    $('#submit').addClass('unsaved');
  })


//===== Database Listeners ==========================================================

  // when locationReturned changes, indicate that in the UI
  db.ref('locationName').on('value', function(snap) {
    var sv = snap.val();
    console.log(sv);
    if (sv !== 'unknown' && firstload === false) {
      swal(
        'Success',
        'Your changes have been applied',
        'success'
      )
    }
    // Update the weather app to display the current location
    $('#currentLoc').text("Current Location: " + sv);
  })

  db.ref('errorID').on('value', function(snap) {
    if (firstLoad === false) {
      swal(
        'Uh-oh!',
        'That location was not found. Try again',
        'error'
      )
    } else {
      firstLoad = false;
    } 
  })

//======= Color Picker ===============================================================

})