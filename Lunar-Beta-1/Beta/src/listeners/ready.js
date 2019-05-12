/* eslint-disable linebreak-style */
var playing = require("../../playing.json");
//var botlist = require("./../util/BotList");

exports.run = async (client) => {
  console.log("Lunar is online! Yay!");
  var z = 0;
  console.log("Loading "+ playing.list.length +" playing stats");
  client.user.setActivity("anime | @Lunar help", { type: "WATCHING" });
  setInterval(() => {
    if (z > playing.list.length) z = 0;
    client.user.setActivity(playing.list[z]);
    z++;
  }, 120000);
  var Database = require("./../util/UserDB");
  var database = new Database({ uri: "mongodb://localhost:27017/myproject" }, { useNewUrlParser: true });
  client.db = database;
  //console.log("Posting stats to DBL and Listcord");
  //var botlistClient = new botlist({ client: client });
  // exporting db to our login router
  exports.db = database;
};