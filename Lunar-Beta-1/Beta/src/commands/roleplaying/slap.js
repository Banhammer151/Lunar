const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
var request = require("request");
const url = "https://nekos.life/api/v2/img/slap";
class SlapCommand extends Command {
  constructor(client) {
    super (client, {
      name: "slap",
      aliases: ["sl"],
      group: "roleplaying",
      memberName: "slap",
      description: "You are so Rude...Let me slap you into next week.",
      guildOnly: true,
      args: [{
        key: "member",
        label: "user",
        type: "member",
        prompt: "Mention who do you want to slap, master!"
      }]
    });
  }
  async run(msg, { member }) {
    request({
      url: url,
      json: true
    }, function(error, response, body) {
    
      if (!error && response.statusCode === 200) {
        var user = member.user;
        const imageurl = body.url;
        var embed = new RichEmbed().setTitle(`${msg.author.username} slapped ${user.username}. Ouch...`).setImage(imageurl).setColor(0xFF0090);
        msg.channel.send(embed);
      }
    });
  }
}

module.exports = SlapCommand;