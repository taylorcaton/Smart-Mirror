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

  db = firebase.database();

  // When the weather button is clicked, read the location and update the DB
  $('#submitWeather').on('click', function() {
    event.preventDefault();
    var myLoc = $('#myLocation').val().trim()
    db.ref('location').set(myLoc);
    $('#myLocation').val(null);
  })

  db.ref().on('value', function(snap) {
    var sv = snap.val();
    console.log(sv.location);
    // Update the weather ap to display the current location
    $('#currentLoc').text("Current Location: " + sv.location);
  })