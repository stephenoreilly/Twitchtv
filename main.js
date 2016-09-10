var queryArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"]
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
  if(result.stream){
    setDisplayForOnlineChannel(result, index, name);
  }
  else if(result.error){
    setDisplayForChannelNonExist(index, name);
  }
  else{
    setDisplayForOfflineChannel(result, index, name);
  }
}

function setDisplayForOfflineChannel(result, index, name){
  setLogo(result._links.channel, index);
  setNameSpan(name, index);
  setGameText(index, "Offline");
}
function setDisplayForOnlineChannel(result, index, name){
  setLogo(result._links.channel, index);
  setGameText(index, result.stream.channel.status);
  setNameSpan(name, index);
}
function setDisplayForChannelNonExist(index, name){
  $("#twitch-channel-" + index + " span.name").html(name);
  setGameText(index, "Channel no longer available");
}

function setGameText(index, gameText){
  $("#twitch-channel-" + index + " span.game").html(gameText);
}
function setLogo(queryUrl, index){
  $.getJSON(queryUrl, function(data) {
    $("#twitch-channel-" + index + " span.img").html("<img src='" + data.logo + "'/>");
  });
}
function setNameSpan(name, index){
  $("#twitch-channel-" + index + " span.name").html("<a href='https://www.twitch.tv/" + name + "' target='_blank'>" + name + "</a>");
}