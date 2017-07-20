document.addEventListener("DOMContentLoaded", function() {
  getNews();
});

function getNews(input){
  apiKey = "98a49a60de5b49b18c698cfd0fce0ba5";
  language = "en";
  country = "us";
  source = input;
  queryUrl = "https://newsapi.org/v1/articles?source=" + source + "&sortBy=top&apiKey=" + apiKey;

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    var articles = response.articles;
    $("#newsPane").empty();
    // var table = $("<table>");
    // var trHeader = $("<tr class='newsHeader'>");
    // var tdTitle = $("<td class='newsTitle'>");
    // var tdDate = $("<td class='newsDate'>");
    // var trContent = $("<tr class='newsContent'>");

    // // Empty the pane and update
    // $("#quotePane").empty();
    // $("#quotePane").append(table);

    // // console.log(articlesDate);
    // Loop through each article and print them on screen
      for(i = 0; i < 3; i ++){
        console.log(articles[i]);
          $("#newsPane").append(articles[i].title);
          $("#newsPane").append($("<br>"));
          $("#newsPane").append(articles[i].description);
          $("#newsPane").append($("<hr>"));
          $('#newsPane').fadeIn('slow');
        }
  }); // End ajax.done()

} // End getNews()

function showNews(){
  $("#newsPane").show();
}

function hideNews(){
  $("#newsPane").hide();
}

// function prettyDate(time){
//   var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
//     diff = (((new Date()).getTime() - date.getTime()) / 1000),
//     day_diff = Math.floor(diff / 86400);
      
//   if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
//     console.log("Error");
//     return;
      
//   return day_diff == 0 && (
//       diff < 60 && "just now" ||
//       diff < 120 && "1 minute ago" ||
//       diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
//       diff < 7200 && "1 hour ago" ||
//       diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
//     day_diff == 1 && "Yesterday" ||
//     day_diff < 7 && day_diff + " days ago" ||
//     day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
// } // end prettyDate()

// // If jQuery is included in the page, adds a jQuery plugin to handle it as well
// if ( typeof jQuery != "undefined" )
//   jQuery.fn.prettyDate = function(){
//     return this.each(function(){
//       var date = prettyDate(this.title);
//       if ( date )
//         jQuery(this).text( date );
//     });
//   }; // end if()

