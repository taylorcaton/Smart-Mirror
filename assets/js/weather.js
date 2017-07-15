var temp;

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
        
        $(".icon").html("<img src='http:"+data.current.condition.icon+"' alt='Icon depicting current weather.'>");
        $(".description").html("<h2>" + data.current.condition.text + "</h2>");

    });
}