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


			$('#quotePane').fadeOut('slow', function() {
            	$("#quotePane").empty();
            	$("#quotePane").append($("<hr>"));
				$("#quotePane").append(quoteText).addClass("text-center").append("<br>");
				$("#quotePane").append(quoteAuthor).addClass("text-center");
            	$('#quotePane').fadeIn('slow');
        	});

			
		}
	});
}