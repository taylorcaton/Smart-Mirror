document.addEventListener("DOMContentLoaded", function() {
startTimer();
});

function showQuote(){
	$.ajax({
		url: "https://api.forismatic.com/api/1.0/?",
		dataType: "jsonp",
		data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
		success: function( response ) {
			console.log(response);
		$("#random_quote").html("<p id='random_quote' class='lead text-center'>" +
		response.quoteText + "<br/>&dash; " + response.quoteAuthor + " &dash;</p>");
		$("#tweet").attr("href", "https://twitter.com/home/?status=" + response.quoteText +
		' (' + response.quoteAuthor + ')');
		}
	});
}
