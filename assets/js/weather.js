

var temp;
var icon;
var description;

//Draws the weather to the window
function getWeather(location){

    var APIKey = "44750aae265346679f0162443170607";

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
        var row = $("<div class='row text-left'>");
        var row2 = $("<div class='row text-left'>");

        row.append("<div class='col-xs-6'><img src='assets/images/"+icon+".png' alt='Icon depicting current weather.'></div>")
        row.append("<div class='col-xs-6'><h1 id='temperature'>" + temp + "°F</h1></div>")

        newDiv.append(row);

        row2.append("<div class='col-xs-12'><h2 class='text-center' id='condition'>" + description + "</h2></div>")
        newDiv.append(row2);

        $('#weatherPane').fadeOut('slow', function() {
            $('#weatherPane').html(newDiv);
            $('#weatherPane').fadeIn('slow');
        });

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
          db.ref("errorID").set(Math.random());
        }
      }
    })
    // We store all of the retrieved data inside of an object called "data"
    .done(function(data) {

        // db.ref("locationName").set(data.location.name+", "+data.location.region);
        // db.ref("timezone").set(data.location.tz_id);
        // db.ref("location").set(location);

        var updates = {}
        updates["locationName"] = data.location.name+", "+data.location.region;
        updates["location"] = location;
        updates["timezone"] = data.location.tz_id;
        db.ref().update(updates)

    });
}

function unknownWeather(){
        var newDiv = $("<div>");
        var p = $("<p class='text-left'>")
        p.append("<img src='assets/images/unknown.png' alt='Icon depicting current weather.'>")
        //p.append("<h2>?°F</h2>")
        //p.append("<h4>unknown source</h4>")
        newDiv.append(p);
        
        $('#weatherPane').fadeOut('slow', function() {
            $('#weatherPane').html(newDiv);
            $('#weatherPane').fadeIn('slow');
        });
}
