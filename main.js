var queryArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"]
$.each(queryArray, function(index, query){
	queryTwitch(query, index + 1);
});

function queryTwitch(query, index){
	var queryUrl = 'https://api.twitch.tv/kraken/streams/' + query + '?callback=?'
	$.getJSON(queryUrl, function(data) {
		console.log(data);
		console.log(index);
		displayResult(data, index, query)
	});
}
function displayResult(result, index, name){
	if(result.stream){
		$("#twitch-channel-" + index + " span.game").html(result.stream.channel.status);
		$("#twitch-channel-" + index + " span.img").html("<img src='" + result.stream.channel.logo + "'/>");
		$("#twitch-channel-" + index + " span.name").html("<a href='https://www.twitch.tv/" + name + "' target='_blank'>" + name + "</a>");
		console.log("result.stream");
		// displayErrorMessage();
	}
	else if(result.error){
		$("#twitch-channel-" + index + " span.name").html(name);
		$("#twitch-channel-" + index + " span.game").html("Channel no longer available");
		console.log("result.error");
		// displayGameInfo():
	}
	else{
		setLogo(result._links.channel, index);
		$("#twitch-channel-" + index + " span.name").html("<a href='https://www.twitch.tv/" + name + "' target='_blank'>" + name + "</a>");
		$("#twitch-channel-" + index + " span.game").html("Offline");
		console.log("null");
		// displayChannelOffline();
	}
}

function setLogo(queryUrl, index){
	$.getJSON(queryUrl, function(data) {
		$("#twitch-channel-" + index + " span.img").html("<img src='" + data.logo + "'/>");
	});
}