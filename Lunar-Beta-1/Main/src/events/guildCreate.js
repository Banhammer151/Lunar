var con = require("../modules/functions.js");
module.exports = (client, guild) => {
    console.log("log", `New guild has been joined: ${guild.name} (${guild.id}) with ${guild.memberCount}`, "JOINED");
    let guildid = `${guild.id}`, guildname = `${guild.name}`, guildcreatedAt = `${guild.createdAt}`, guildownerID = `${guild.ownerID}`, guildowner = `${guild.owner}`;
    client.guildjoinadd(guildid, guildname, guildcreatedAt, guildownerID, guildowner);
  };
  