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
        
        var newDiv = $("<div>");
        var p = $("<p class='text-center'>")
        p.append("<img src='http:"+icon+"' alt='Icon depicting current weather.'>")
        p.append("<h2>" + temp + "°F</h2>")
        p.append("<h4>" + description + "</h4>")
        newDiv.append(p);
        $("#weatherPane").append(newDiv);

    });
}