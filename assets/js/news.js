document.addEventListener("DOMContentLoaded", function() {
  getNews("ars-technica");
});

// The news source on inital start was undefined how I wrote above function. I defaulted that it would be ars-technica.
// What if we assign that variable to local storage so it will save thier last choice if they close the website?

var newsInterval;

function displayNews(articles) {
  var i = 0;
  drawNews(articles[i]);
  i++
  newsInterval = setInterval(function() {
    $('#newsPane').fadeOut('slow');
    setTimeout(function(){
      if (i === articles.length) { i = 0 };
      drawNews(articles[i]);
      i++;
    }, 1000)
  } , 10000);
}

function drawNews(article) {
    $("#newsPane").empty();
    $('#newsPane').fadeIn('slow');
    $("#newsPane").append("<div id='newsTitle'><i class='fa fa-newspaper-o' aria-hidden='true'></i> "+article.title+"</div>");
    $("#newsPane").append($("<br>"));
    $("#newsPane").append("<div id='newsDescription'>"+article.description+"</div>");
    $("#newsPane").append($("<br>"));
}

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

    var articles = response.articles;
    $("#newsPane").empty();
    displayNews(articles);

  }); // End ajax.done()

} // End getNews()

function showNews(){
  $("#newsPane").show();
}

function hideNews(){
  $("#newsPane").hide();
}
