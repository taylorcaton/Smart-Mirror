// Make a new API call and re-draw the weather results when the db changes

var dbTimeZone = "America/New_York";
var dbNewsSource = "";
var rainbowInterval;

db.ref('newsSource').on('value', function(snap) {
    clearInterval(newsInterval)
    getNews(snap.val());
})

db.ref('timezone').on('value', function(snap) {
    dbTimeZone = snap.val();
    console.log("db.timezone changed to " + snap.val())
    hourCorrection(snap.val());
    return dbTimeZone;
})

db.ref('location').on('value', function(snap) {
    if(snap.val().locationName === "unknown"){
        unknownWeather();
    }else{
        console.log("new weather location from firebase")
        getWeather(snap.val());
    }
})

db.ref('digitalClockStyle').on('value', function(snap) {
    if(snap.val() === 'military') {
        //show24HourTime();
    }
})

db.ref('clockStyle').on('value', function(snap) {
    if (snap.val() === 'analog') {
        showAnalogClock()
    } else if (snap.val() === 'digital') {
        showDigitalClock()
    }
})

db.ref('color').on('value', function(snap) {
    var color = snap.val();
    if (color === "rainbow") {
        rainbow();
    } else {
        changeColor(color);
        // clearInterval(rainbowInterval);
        // $('#weatherPane').css('color', color);
        // $('#clockPane').css('color', color);
        // $('#newsPane').css('color', color);
        // $('#quotePane').css('color', color);
        // $('#condition').css('color', color);
        // $('#hiLo').css('color', color);
        
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
         "rgb(127,0,255)", "rgb(255,0,255)", "rgb(255,0,127)"];

    var i = 1;

    rainbowInterval = setInterval( function() {
        $('#weatherPane').css('color', colors[i]);
        $('#clockPane').css('color', colors[i]);
        $('#newsPane').css('color', colors[i]);
        $('#quotePane').css('color', colors[i]);
        $('#condition').css('color', colors[i]);
        $('#hiLo').css('color', colors[i]);
        i++;
        if (i === colors.length){
            i=0;
        }
    }, 5000);    
}

function changeColor(color) {
    clearInterval(rainbowInterval);
    $('#weatherPane').css('color', color);
    $('#clockPane').css('color', color);
    $('#newsPane').css('color', color);
    $('#quotePane').css('color', color);
    $('#condition').css('color', color);
    $('#hiLo').css('color', color);    
}