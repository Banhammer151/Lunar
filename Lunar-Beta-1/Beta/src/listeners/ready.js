/* eslint-disable linebreak-style */
var playing = require("../../playing.json");
var botlist = require("./../util/BotList");
const sql = require("sqlite");
sql.open("./database.sqlite");

exports.run = async (client) => {
  console.log("Lunar is online! Yay!");
  //var z = 0;
  console.log("Loading "+ playing.list.length +" playing stats");
  client.user.setActivity(`helping ${client.guilds.size} guilds and ${client.users.size} users`, { type: "WATCHING" });
  // setInterval(() => {
  //   if (z > playing.list.length) z = 0;
  //   client.user.setActivity(playing.list[z]);
  //   z++;
  // }, 120000);
  var Database = require("./../util/UserDB");
  var database = new Database({ uri: `mongodb://${process.env.MUSER}:${process.env.MPWD}@localhost:27017/myproject?authSource=admin` }, { useNewUrlParser: true });
  client.db = database;
  console.log("Posting stats to DBL");
  sql.run("CREATE TABLE IF NOT EXISTS settings (guildid TEXT UNIQUE, partner CHARACTER, desc VARCHAR, lastdate VARCHAR)").then(() => {
    for (const guild of client.guilds.values()) {
      sql.run("INSERT OR IGNORE INTO settings (guildid) VALUES (?)", [guild.id]);
    }
  });
  // eslint-disable-next-line no-unused-vars
  const botlistClient = new botlist({ client: client });
  // exporting db to our login router
 
  exports.db = database;
};
