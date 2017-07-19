// Make a new API call and re-draw the weather results when the db changes
db.ref().on('value', function(snap) {


	if(snap.val().locationName === "unknown"){
		unknownWeather();
	}else{
		console.log("new weather location from firebase")
		getWeather(snap.val().location);
		hourCorrection(snap.val().timezone);
	}
	

    if(snap.val().digitalClockStyle === "military"){
    	show24HourTime();
    }

})

document.addEventListener("DOMContentLoaded", function() {
	getQuotes();
});


//Fetches a new quote every 60 seconds
function getQuotes(){
	setInterval(getQuote, 60000);
	getQuote();
}