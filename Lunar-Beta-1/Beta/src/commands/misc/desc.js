const { Command } = require("discord.js-commando");
const sql = require("sqlite");
sql.open("./database.sqlite");

class PreviewPs extends Command {
  constructor(client) {
    super (client, {
      name: "desc",
      aliases: ["desc"],
      group: "misc",
      memberName: "desc",
      throttling: {
        usages: 2,
        duration: 5
      },
      description: "Preview Your PartnerShip Message",
      examples: ["pps", "previewps"],
      guildOnly: true,
      args: [{
        key: "text",
        label: "text",
        prompt: "Please enter what Your Description Should Be",
        type: "string"
         
           
      }]
      
    });
  }
  async run(msg, {text}) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      return msg.channel.send("You need to have the administrator permission to do this.");
    }
    sql.run("UPDATE settings SET desc = ? WHERE guildid = ?", [text, msg.guild.id]);
    msg.channel.send("Description updated sucessfully.");
  }
}

module.exports = PreviewPs;