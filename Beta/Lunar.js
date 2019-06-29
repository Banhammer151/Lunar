/* eslint-disable linebreak-style */
const { Client } = require("discord.js-commando");
const path = require("path");
var { readdir } = require("fs");
const MongoClient = require("mongodb").MongoClient;
const MongoDBProvider = require("commando-provider-mongo");
require("dotenv").config({path:"./.env"});
const sql = require("sqlite");
sql.open("./database.sqlite"); // Create the database!!



console.log("Loading Lunar client...");
console.log("Loading CanvasCommand client (buffers and fonts)...");

var CanvasClient = require("./src/util/CanvasCommand");
CanvasClient.loadResources().then(msg => {
  console.log(msg);
});

var client = new Client({
  owner: "142250706307514368",
  commandPrefix: "!",
  unknownCommandResponse: false,
  disableEveryone: true,
  autoReconnect: true,
  disabledEvents: ["TYPING_START", "TYPING_STOP"]
});

client.setProvider(MongoClient.connect(`mongodb://${process.env.MUSER}:${process.env.MPWD}@localhost:27017/myproject?authSource=admin`, { useNewUrlParser: true }).then(cliente => new MongoDBProvider(cliente, "Lunar"))).catch(console.error);
client.login(process.env.TOKEN);

client.registry.registerGroups([
  ["moderation", "Moderation"],
  ["fun", "Funny"],
  ["test", "Testing"],
  ["misc", "Misc"],
  ["social", "Social"],
  ["roleplaying", "Roleplaying"]
]).registerDefaultTypes()
  .registerDefaultGroups()
  .registerDefaultCommands({ "ping": false, "reload": false, "help": false})
  .registerCommandsIn(path.join(__dirname, "src/commands"));
readdir("./src/listeners", function(e, files) {
  files.forEach(event => {
    var eventName = event.split(".");
    if (eventName[1] == "js") {
      var eventR = require("./src/listeners/"+ event);
      if (eventName[0] == "ready") {
        client.on("ready", () => eventR.run(client));
      } else {
        client.on(eventName[0], (...args) => eventR.run(...args));
      }
      delete require.cache[require.resolve("./src/listeners/"+ event)];
    }
  });
});