
var express = require("express")
  , app = express()
  , http = require("http").createServer(app)
  , _ = require("underscore")
  , io = require("socket.io").listen(http);

var participants = []

app.set("ipaddress", "127.0.0.1");

app.set("port", 8080);

app.set("views",__dirname + "/views");

app.set("view engine", "jade");

app.use(express.static("public",__dirname + "/public"));

app.use(express.bodyParser());

app.get("/", function(request, response) {

  response.render("index");

});

app.post("/message", function(request, response) {

  var message = request.body.message;

  if(_.isUndefined(message) || _.isEmpty(message.trim())) {
    return response.json(400, {error: "Message is invalid"});
  }

  var name = request.body.name;

  io.sockets.emit("incomingMessage", {message: message, name: name});


  response.json(200, {message: "Message received"});

});

io.on("connection", function(socket){

  socket.on("newUser", function(data){
    participants.push({id: data.id, name: data.name});
    io.sockets.emit("newConnection", {participants: participants});
  });

  socket.on("nameChange", function(data) {
    _.findWhere(participants, {id: socket.id}).name = data.name;
    io.sockets.emit("nameChanged", {id: data.id, name: data.name});
  });

  socket.on("disconnect", function() {
    participants = _.without(participants,_.findWhere(participants, {id: socket.id}));
    io.sockets.emit("userDisconnected", {id: socket.id, sender:"system"});
  });

});

http.listen(app.get("port"), app.get("ipaddress"), function() {
  console.log("Server is online. Try http:// " + app.get("ipaddress") + ":" + app.get("port"));
});
