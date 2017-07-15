document.addEventListener("DOMContentLoaded", function() {
getQuotes();
});

function getQuote(){
	$.ajax({
		url: "https://api.forismatic.com/api/1.0/?",
		dataType: "jsonp",
		data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
		success: function( response ) {
			console.log(response);
			var quoteText = response.quoteText;
			var quoteAuthor = "- " + response.quoteAuthor;
			console.log(quoteAuthor + quoteText);

			$("#quotePane").empty();
			$("#quotePane").append(quoteText);
			$("#quotePane").append($("<hr>"));
			$("#quotePane").append(quoteAuthor);
		}
	});
}

function getQuotes(){
	setInterval(getQuote, 60000);
	getQuote();
}