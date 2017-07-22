function getQuote(){
  $.ajax({
    url: "https://api.forismatic.com/api/1.0/?",
    dataType: "jsonp",
    data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
    success: function( response ) {
      // console.log(response);
      var author = response.quoteAuthor;
      var verifiedAuthor;
      if(author === ""){
        verifiedAuthor = "Unknown";
        } else {
        verifiedAuthor = response.quoteAuthor;
      } // end if/else
      var quoteText = response.quoteText;
      var quoteAuthor = "- " + verifiedAuthor;
      // console.log(quoteAuthor + quoteText);
      $('#quotePane').fadeOut(15000, function() {
      $("#quotePane").empty();
      setTimeout( function() {
        $("#quotePane").append("<div id='quoteText'>&#8220;"+quoteText+"&#8221;</div>").addClass("text-center");
        $("#quotePane").append("<div class='text-right' id='quoteAuthor'>"+quoteAuthor+"</div>");
        $('#quotePane').fadeIn(15000);
        }, 30000);
      });// end setTimeout()
    }// end success
  });// end ajax
}// end getQuote()