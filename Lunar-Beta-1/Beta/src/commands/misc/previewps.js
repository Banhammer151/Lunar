const { Command } = require("discord.js-commando");
const sql = require("sqlite");
sql.open("./database.sqlite");
class PreviewPs extends Command {
  constructor(client) {
    super (client, {
      name: "previewps",
      aliases: ["pps"],
      group: "misc",
      memberName: "previewps",
      throttling: {
        usages: 2,
        duration: 5
      },
      description: "Preview Your PartnerShip Message",
      examples: ["pps", "previewps"],
      guildOnly: true
      
    });
  }
  async run(msg) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      return msg.channel.send(msg, msg.guild.id, msg.channel.id, "You need to have the administrator permission to do this.");
    }
    sql.get("SELECT * FROM settings WHERE guildid = ?", [msg.guild.id]).then(row => {
      const str = [
        `__**${msg.guild.name}**__`,
        `${row.desc} [Invite]`
      ];
        
      msg.channel.send(str.join("\n\n"));
    });
  }
    
  
}


module.exports = PreviewPs;