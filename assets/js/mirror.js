// Make a new API call and re-draw the weather results when the db changes
db.ref('location').on('value', function(snap) {
    getWeather(snap.val());

    if(snap.child("digitalClockStyle").val() === "military"){
    	show24HourTime();
    }


})