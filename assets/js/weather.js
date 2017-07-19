

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




function getWeatherUI(location){

    var APIKey = "44750aae265346679f0162443170607";

    // var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
    // "q="+location+"&units=imperial&appid=" + APIKey;

    var queryURL = "https://api.apixu.com/v1/current.json?" +
    "key="+APIKey+"&q="+location;

    $.ajax({
        url: queryURL,
        method: "GET",
        statusCode: {
        400: function() {
          db.ref("locationName").set("unknown");
          db.ref("location").set("unknown");
        }
      }
    })
    // We store all of the retrieved data inside of an object called "data"
    .done(function(data) {

        db.ref("locationName").set(data.location.name+", "+data.location.region);
        db.ref("timezone").set(data.location.tz_id);

    });
}

function unknownWeather(){
        var newDiv = $("<div>");
        var p = $("<p class='text-left'>")
        p.append("<img src='assets/images/unknown.png' alt='Icon depicting current weather.'>")
        p.append("<h2>?°F</h2>")
        p.append("<h4>unknown source</h4>")
        newDiv.append(p);
        $("#weatherPane").html(newDiv);
}
