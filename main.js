var queryArray = ["ESL_SC2", "OgamingSC2", "brunofin", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
$.each(queryArray, function(index, query){
	queryTwitch(query, index + 1);
});

function queryTwitch(query, index){
	var queryUrl = 'https://api.twitch.tv/kraken/streams/' + query + '?callback=?'
	$.getJSON(queryUrl, function(data) {
		displayResult(data, index, query)
	});
}
function displayResult(result, index, name){
	console.log(result);
	$("#twitch-channel-" + index + " span.name").html(name);
	if(result.stream){
		$("#twitch-channel-" + index + " span.game").html(result.stream.game);
		$("#twitch-channel-" + index + " span.img").html("<img src='" + result.stream.channel.logo + "'/>");
		console.log("result.stream");
		// displayErrorMessage();
	}
	else if(result.error){
		$("#twitch-channel-" + index + " span.game").html("Channel no longer available");
		console.log("result.error");
		// displayGameInfo():
	}
	else{
		$("#twitch-channel-" + index + " span.game").html("Offline");
		console.log("null");
		// displayChannelOffline();
	}
}