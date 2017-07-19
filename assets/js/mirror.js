// Make a new API call and re-draw the weather results when the db changes
db.ref().on('value', function(snap) {


	if(snap.val().locationName === "unknown"){
		unknownWeather();
	}else{
		console.log("new weather location from firebase")
		getWeather(snap.val().location);
	}
	

    if(snap.val().digitalClockStyle === "military"){
    	//show24HourTime();
    }



})

db.ref('color').on('value', function(snap) {
    var color = snap.val();
    $('#weatherPane').css('color', color);
    $('#clockPane').css('color', color);
    $('#newsPane').css('color', color);
    $('#quotePane').css('color', color);
})

document.addEventListener("DOMContentLoaded", function() {
	getQuotes();
});


//Fetches a new quote every 60 seconds
function getQuotes(){
	setInterval(getQuote, 60000);
	getQuote();
}