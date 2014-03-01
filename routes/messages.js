exports.postMessage = function(request, response) {
  var message = request.body.message;

  if(request._.isUndefined(message) || request._.isEmpty(message.trim())) {
    return response.json(400, {error: "Message is invalid"});
  }

  var name = request.body.name;

  request.io.sockets.emit("incomingMessage", {message: message, name: name});

  response.json(200, {message: "Message received"});
};