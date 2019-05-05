/* eslint-disable linebreak-style */
var playing = require("../../playing.json");
var botlist = require("./../util/BotList");

exports.run = async (client) => {
  console.log("Kanori is online! Yay!");
  var z = 0;
  console.log("Loading "+ playing.list.length +" playing stats");
  client.user.setActivity("anime | @Kanori help", { type: "WATCHING" });
  setInterval(() => {
    if (z > playing.list.length) z = 0;
    client.user.setActivity(playing.list[z]);
    z++;
  }, 120000);
  var Database = require("./../util/UserDB");
  var database = new Database({ uri: process.env.MONGOURI });
  client.db = database;
  console.log("Posting stats to DBL and Listcord");
  var botlistClient = new botlist({ client: client });
  // exporting db to our login router
  exports.db = database;
};