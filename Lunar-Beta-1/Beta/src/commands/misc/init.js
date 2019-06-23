const { Command } = require("discord.js-commando");
const sql = require("sqlite");
sql.open("./database.sqlite");

class PreviewPs extends Command {
  constructor(client) {
    super (client, {
      name: "init",
      aliases: ["ini"],
      group: "misc",
      memberName: "init",
      throttling: {
        usages: 2,
        duration: 5
      },
      description: "Preview Your PartnerShip Message",
      examples: ["pps", "previewps"],
      guildOnly: true,
      args: [{
        key: "channel",
        prompt: "Please enter the channel to set bump channel.",
        type: "channel"
      }]
      
    });
  }
  async run(msg, {channel}) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      return  msg.channel.send("You need to have the administrator permission to do this.");
    }
   
    
    
    if (channel) {
      sql.run("UPDATE settings SET partner = ? WHERE guildid = ?", [channel.id, msg.guild.id]);
      msg.channel.send("Channel sucessfully synced.");
    } else {
      msg.channel.send("Invalid channel.");
    }
  }
}

module.exports = PreviewPs;