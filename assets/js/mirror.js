// Make a new API call and re-draw the weather results when the db changes
db.ref().on('value', function(snap) {

	console.log("value " + snap.val().locationName)	;
    getWeather(snap.val().locationName);

    if(snap.val().digitalClockStyle === "military"){
    	show24HourTime();
    }

})

document.addEventListener("DOMContentLoaded", function() {
	getQuotes();
});

function getQuotes(){
	setInterval(getQuote, 60000);
	getQuote();
}