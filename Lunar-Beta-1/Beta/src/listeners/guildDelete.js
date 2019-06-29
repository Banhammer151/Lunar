/* eslint-disable linebreak-style */
exports.run = async (guild) => {
  const sql = require("sqlite");
  sql.open("./database.sqlite");
  sql.run("DELETE * FROM settings WHERE guildid = ?", [guild.id]);
  const now = Date.now();
  console.log(`Lunar has Left ${guild.name}` );
  this.client.guilds.get("555894246717259797").channels.get("594557392541188096").send(`Lunar has Left ${guild.name} at ${now}`);
};