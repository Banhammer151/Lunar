var con = require("../modules/functions.js");
module.exports = (client, guild) => {
    console.log("log", `Guild Leave: ${guild.name} (${guild.id}) with ${guild.memberCount}`, "JOINED");
    let guildid = `${guild.id}`;
    con.select('DELETE FROM guilds WHERE `guildid`="'+guildid+'"', function(rows) {
        console.log("Guild Left successfully");
    
      
  
    });
    
  };
