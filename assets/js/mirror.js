

var dbTimeZone = "America/New_York";
var dbNewsSource = "";
var rainbowInterval;

// update the news section when DB values change
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

// if the location entered is valid, call getWeather, otherwise set location to 'unknown'
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

// show digital or analog clock depending on user selection
db.ref('clockStyle').on('value', function(snap) {
    if (snap.val() === 'analog') {
        showAnalogClock()
    } else if (snap.val() === 'digital') {
        showDigitalClock()
    }
})

// when the color changes, either start the rainbow function or simple chamge the colors
db.ref('color').on('value', function(snap) {
    var color = snap.val();
    if (color === "rainbow") {
        rainbow();
    } else {
        changeColor(color);
    }
})

db.ref('weatherOn').on('value', function(snap) {
    hideWeather(snap.val());
})

db.ref('clockOn').on('value', function(snap) {
    hideClock(snap.val());
})

db.ref('newsOn').on('value', function(snap) {
    hideNews(snap.val());
})

db.ref('quoteOn').on('value', function(snap) {
    hideQuote(snap.val());
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

// when user changes text color, update all the text colors
function changeColor(color) {
    clearInterval(rainbowInterval);
    $('#weatherPane').css('color', color);
    $('#clockPane').css('color', color);
    $('#newsPane').css('color', color);
    $('#quotePane').css('color', color);
    $('#condition').css('color', color);
    $('#hiLo').css('color', color);    
}

function hideWeather(val) {
    if (val === true) {
        $('#weatherPane').removeClass('hidden');
    } else {
        $('#weatherPane').addClass('hidden');
    }
}

function hideClock(val) {
    if (val === true) {
        $('#clockPane').removeClass('hidden');
    } else {
        $('#clockPane').addClass('hidden');
    }
}

function hideNews(val) {
    if (val === true) {
        $('#newsPane').removeClass('hidden');
    } else {
        $('#newsPane').addClass('hidden');
    }
}

function hideQuote(val) {
    if (val === true) {
        $('#quotePane').removeClass('hidden');
    } else {
        $('#quotePane').addClass('hidden');
    }
}
