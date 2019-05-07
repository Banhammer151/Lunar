/* eslint-disable linebreak-style */
var express = require("express");
var app = express();
var options = {"root":"./src/website/"};
class WebsiteLoader {
  constructor() {
    this.loadWebsite(app);
  }
 
  loadWebsite() {
    app.use("/api/discord", require("./ExpressLoginRouter"));
    app.use((err, req, res, next) => {
      switch (err.message) {
        case "NoCodeProvided":
          return res.status(400).send({
            status: "ERROR",
            error: err.message,
          });
        default:
          return res.status(500).send({
            status: "ERROR",
            error: err.message,
          });
      }
    });
    app.get("/", function(req, res) {
      console.log("Got a GET request on / > Sending HOME page");
      res.sendFile("index.html", options);
    });
    app.get("/authSucess", function(req, res) {
      console.log("alguem se logou owo");
      res.sendFile("authOk.html", options);          
    });
    app.get("/dashboard", function(req, res) {
      console.log("Got GET request on /dashboard > SENDING DASHBOARD PAG");
      res.sendFile("dashboard.html", options);
    });
    app.get("/dashboard.html", function(req, res) {
      console.log("GOT GET REQUEST ON /dashboard.html > SENDING DASHBOARD PAG");
      res.sendFile("dashboard.html", options);
    });
    app.get("/auth", function(req, res) {
      res.status(200).sendFile("auth.html", options);
    });
    app.listen(process.env.PORT || 3000, function() {
      console.log("Website Listener is listing...");
    });
  }
}

module.exports = WebsiteLoader;

exports.app = app; 