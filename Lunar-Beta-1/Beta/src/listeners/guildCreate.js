/* eslint-disable linebreak-style */
exports.run = async (guild) => {
  const sql = require("sqlite");
  sql.open("./database.sqlite");
  console.log(`I have joined the guild ${guild.name}`);
  sql.run("INSERT OR IGNORE INTO settings (guildid) VALUES (?)", [guild.id]);
};