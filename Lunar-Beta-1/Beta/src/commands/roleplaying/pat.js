const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
var request = require("request");
const url = "https://nekos.life/api/v2/img/pat";
class PatCommand extends Command {
  constructor(client) {
    super (client, {
      name: "pat",
      aliases: ["pt"],
      group: "roleplaying",
      memberName: "pat",
      description: "You are so kind...Let me give you a pat on the head",
      guildOnly: true,
      args: [{
        key: "member",
        label: "user",
        type: "member",
        prompt: "Mention who do you want pat, master!"
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
        var embed = new RichEmbed().setTitle(`${msg.author.username} Patted ${user.username} on the head.`).setImage(imageurl).setColor(0xFF0090);
        msg.channel.send(embed);
      }
    });
  }
}

module.exports = PatCommand;