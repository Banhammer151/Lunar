/* eslint-disable linebreak-style */
exports.run = async (guild) => {
  const sql = require("sqlite");
  const now = Date.now();
  sql.open("./database.sqlite");
  sql.run("INSERT OR IGNORE INTO settings (guildid) VALUES (?)", [guild.id]);
  console.log(`Lunar has Joined ${guild.name}` );
  this.client.guilds.get("555894246717259797").channels.get("594557392541188096").send(`Lunar has Joined ${guild.name} at ${now}`);
};