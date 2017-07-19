function getQuote(){
	$.ajax({
		url: "https://api.forismatic.com/api/1.0/?",
		dataType: "jsonp",
		data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
		success: function( response ) {
			console.log(response);

				var author = response.quoteAuthor;
				var verifiedAuthor;
				if(author === ""){
					verifiedAuthor = "Unknown";
				} else {
					verifiedAuthor = response.quoteAuthor;
				} 
			
			var quoteText = response.quoteText;
			var quoteAuthor = "- " + verifiedAuthor;
			console.log(quoteAuthor + quoteText);



			$("#quotePane").empty();
			$("#quotePane").append(quoteText);
			$("#quotePane").append($("<hr>"));
			$("#quotePane").append(quoteAuthor);
		}
	});
}