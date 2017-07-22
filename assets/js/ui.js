//===== Initialize Page =============================================================

let firstLoadSuccess = true;
let firstLoadError = true;
let myColor = "";

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
    $('#enableNews').prop('checked', sv.newsOn);
    // colors
    $("[value='" + sv.color +"']").prop('checked', true);
    $('#colorPicker').val(sv.color);
    myColor = sv.color;
    if (sv.color === 'rainbow') {
      $('#swatchC').css('background-image', 'url("assets/images/rainbow.jpg');
    } else {
      $('#swatchC').css('background-color', sv.color);
    }
  })

//===== Event Listeners ==============================================================

  $('#submit').on('click', function() {
    event.preventDefault();
    $('#submit').removeClass('unsaved');
    // read and set weather inputs
    if ($('#myLocation').val().trim()) {
      var myLoc = $('#myLocation').val().trim();
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
    db.ref('newsOn').set($('#enableNews').prop('checked'));

    // read and set the quote inputs
    db.ref('quoteOn').set($('#enableQuote').prop('checked'));

    //read and set the color selection
    if (myColor !== "") {
      db.ref('color').set(myColor);
      $('#swatchC').css('background-image', 'none');
      $('#swatchC').css('background-color', myColor);
    } else if ($('#color4').is(':checked')) {
      db.ref('color').set("rainbow");
      $('#swatchC').css('background-image', 'url("assets/images/rainbow.jpg")')
    } else {
      var c = $('.color:checked').val();
      db.ref('color').set(c);
      $('#swatchC').css('background-image', 'none');
      $('#swatchC').css('background-color', c);
    }
    
    
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

  // When a color radio button is clicked, clear 'myColor'
  $('.color').on('click', function() {
    myColor = "";
  })

  // Watch all input fields and highlight the 'apply' once something changes
  $('.watch').on('change', function() {
    $('#submit').addClass('unsaved');
  })

//===== Database Listeners ==========================================================

  // when locationName changes, indicate that in the UI
  db.ref('locationName').on('value', function(snap) {
    var sv = snap.val();
    console.log(sv);
    if (sv !== 'unknown' && firstLoadSuccess === false) {
      swal(
        'Success',
        'Your location has been updated to ' + sv,
        'success'
      )
    }
    firstLoadSuccess = false;

    // Update the weather app to display the current location
    $('#currentLoc').text("Current Location: " + sv);

  });

  // If the location API request returns an error, handle it and alert the user
  db.ref('errorID').on('value', function(snap) {
    if (firstLoadError === false) {
      swal(
        'Uh-oh!',
        'That location was not found. Try again',
        'error'
      )
    } else {
      firstLoadError = false;
    } 

  });

  // When db.newsOn is set to true This will show the top news stories for that source on the UI.html page
  // and when you click on that story it will take you to the story on a new tab or window
  // db.ref('newsOn').on('value', function(snap) {
  //   var sv = snap.val();
  //   if(sv === true){
  //     console.log("User wants to see news stories");
  //   } else {
  //     console.log("User does not want to see news stories");
  //   }
  // });

//======= Color Picker ===============================================================

  $(".basic").spectrum({
    preferredFormat: "hex",
    color: myColor,
    change: function(color) {
        //$("#basic-log").text("change called: " + color.toHexString());
        myColor = color.toHexString();
        $('.color').each(function() {
          $(this).prop('checked', false);
        })
    }
  });













})