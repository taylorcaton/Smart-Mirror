// Make a new API call and re-draw the weather results when the db changes

var dbTimeZone = "";
var dbNewsSource = "";

db.ref().on('value', function(snap) {
	dbTimeZone = snap.val().timezone;
	dbNewsSource = snap.val().newsSource;
	if(snap.val().locationName === "unknown"){
		unknownWeather();
	}else{
		console.log("new weather location from firebase")
		getWeather(snap.val().location);
		hourCorrection(snap.val().timezone);
	}
	
	getNews(dbNewsSource);

    if(snap.val().digitalClockStyle === "military"){
    	//show24HourTime();
    }

    return [dbTimeZone, dbNewsSource];

})

db.ref('color').on('value', function(snap) {
    var color = snap.val();
    if (color === "rainbow") {
        rainbow();
    } else {
        $('#weatherPane').css('color', color);
        $('#clockPane').css('color', color);
        $('#newsPane').css('color', color);
        $('#quotePane').css('color', color);
        window.clearInterval();
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

// Cycle text colors through the RGB color wheel
function rainbow() {
    var colors = ["rgb(255,0,0)", "rgb(255,127,0)", "rgb(255,255,0)", "rgb(127,255,0)", 
        "rgb(0,255,0)", "rgb(0,255,127)", "rgb(0,255,255)", "rgb(0,127,255)",
        "rgb(0,0,255)", "rgb(127,0,255)", "rgb(255,0,255)", "rgb(255,0,127)"];

    var i = 1;

    window.setInterval( function() {
        $('#weatherPane').css('color', colors[i]);
        $('#clockPane').css('color', colors[i]);
        $('#newsPane').css('color', colors[i]);
        $('#quotePane').css('color', colors[i]);
        i++;
        if (i === colors.length){
            i=0;
        }
    }, 5000);    
}