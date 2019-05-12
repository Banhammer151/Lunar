/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const express = require("express");
const app = express();
require("dotenv").config({path: __dirname + "/.env"});
const port = process.env.PORT;
app.set("port", port);

const session = require("express-session");
class WebsiteLoader {
  constructor() {
    this.loadWebsite(app);
  }
 
  loadWebsite() {
    app.set("view engine", "ejs");
    app.use(express.static("static"));
    app.use(session({
      secret: "48738924783748273742398747238",
      resave: false,
      saveUninitialized: false,
      expires: 604800000,
    }));
    require("../../website/router")(app);

    app.listen(port, () => console.info(`Listening on port ${port}`));
  }
}

module.exports = WebsiteLoader;

exports.app = app; 