var temp;
var icon;
var description;
var hi;
var low;

//Draws the weather to the window
function getWeather(location){

    var APIKey = "44750aae265346679f0162443170607";

    var queryURL = "https://api.apixu.com/v1/forecast.json?" +
    "key="+APIKey+"&q="+location;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    // We store all of the retrieved data inside of an object called "data"
    .done(function(data) {

        // Log the resulting object
        console.log(data);

        temp = ""+data.current.temp_f;
        description = data.current.condition.text;
        icon = data.current.condition.icon;
        hi = ""+data.forecast.forecastday["0"].day.maxtemp_f;
        low = ""+data.forecast.forecastday["0"].day.mintemp_f;

        if(temp.indexOf(".") > -1){
            temp = temp.substring(0, temp.indexOf(".")); //Remove everthing after the decimal
        }
        if(hi.indexOf(".") > -1){
            hi = hi.substring(0, hi.indexOf(".")); //Remove everthing after the decimal
        }
        if(low.indexOf(".") > -1){
            low = low.substring(0, low.indexOf(".")); //Remove everthing after the decimal
        }
        
        icon = icon.substring(icon.indexOf(".png")-3, icon.indexOf(".png")); //grab the icon prefix
        
        var newDiv = $("<div>");
        var row = $("<div class='row text-left'>");
        var row2 = $("<div class='row text-left'>");

        row.append("<div class='col-xs-6'><img src='assets/images/"+icon+".png' alt='Icon depicting current weather.'></div>")
        row.append( "<div class='col-xs-6'><div class='row'>"+
                    "<div class='text-center' id='temperature'>" + temp + "<sup style='font-size: 16px; top: -1.5em;'>°F</sup></div>"+
                    "<div class='row'><div class='col-xs-12'><h2 class='text-center' id='condition'>" + description + "</h2></div>"+
                    "</div>")

        newDiv.append(row);

        row2.append("<div class='col-xs-12'><h2 class='text-center' id='hiLo'>" + 
                    "<div><i class='fa fa-angle-up' aria-hidden='true'></i>" + hi + 
                    "<div><i class='fa fa-angle-down' aria-hidden='true'></i>" + low + "</h2></div>")
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
        updates["localTime"] = data.location.localtime;
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
