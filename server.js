
var express = require("express")
  , app = express()
  , http = require("http").createServer(app)
  , _ = require("underscore");

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

  response.json(200, {message: "Message received"});

});

http.listen(app.get("port"), app.get("ipaddress"), function() {
  console.log("Server is online. Try http:// " + app.get("ipaddress") + ":" + app.get("port"));
});
