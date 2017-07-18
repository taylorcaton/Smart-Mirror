function getNews(){
  apiKey = "98a49a60de5b49b18c698cfd0fce0ba5";
  language = "en";
  country = "us";
  queryUrl = "https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=" + apiKey;

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    var articles = response.articles;
    // Loop through each article and print them on screen
    for(i = 0; i < articles.length; i ++){
      console.log(articles[i]);
    }
  });
}