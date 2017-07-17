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

var db = firebase.database();

var temp;
var icon;
var description;

function getWeather(location){

    var APIKey = "44750aae265346679f0162443170607";

    // var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
    // "q="+location+"&units=imperial&appid=" + APIKey;

    var queryURL = "https://api.apixu.com/v1/current.json?" +
    "key="+APIKey+"&q="+location;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    // We store all of the retrieved data inside of an object called "data"
    .done(function(data) {

        // Log the resulting object
        console.log(data);
        console.log("Temperature (F): " + data.current.temp_f);

        temp = data.current.temp_f;
        description = data.current.condition.text;
        icon = data.current.condition.icon;

        icon = icon.substring(icon.indexOf(".png")-3, icon.indexOf(".png"));
        
        var newDiv = $("<div>");
        var p = $("<p class='text-left'>")
        p.append("<img src='assets/images/"+icon+".png' alt='Icon depicting current weather.'>")
        p.append("<h2>" + temp + "°F</h2>")
        p.append("<h4>" + description + "</h4>")
        newDiv.append(p);
        $("#weatherPane").html(newDiv);

    });
}

// Make a new API call and re-draw the weather results when the db changes
db.ref('location').on('value', function(snap) {
    getWeather(snap.val());
})

