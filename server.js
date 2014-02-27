
var express = require("express")
  , app = express()
  , http = require("http").createServer(app);

app.set("ipaddress", "127.0.0.1");

app.set("port", 8080);

app.get("/", function(request, response) {
  response.send("Server is online");

});

http.listen(app.get("port"), app.get("ipaddress"), function() {
  console.log("Server is online. Try http:// " + app.get("ipaddress") + ":" + app.get("port"));
});
