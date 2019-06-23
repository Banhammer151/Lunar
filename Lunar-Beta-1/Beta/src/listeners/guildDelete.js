/* eslint-disable linebreak-style */
exports.run = async (guild) => {
  const sql = require("sqlite");
  sql.open("./database.sqlite");
  console.log(`I have left the guild ${guild.name}`);
  sql.run("DELETE * FROM settings WHERE guildid = ?", [guild.id]);
};