document.addEventListener("DOMContentLoaded", function() {
startTimer();
});

function showQuote(){
	$.ajax({
		url: "https://api.forismatic.com/api/1.0/?",
		dataType: "jsonp",
		data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
		success: function( response ) {
			var quoteText = response.quoteText;
			var quoteAuthor = response.quoteAuthor;
			var temp = 
			console.log(response);
		}
	});
}
