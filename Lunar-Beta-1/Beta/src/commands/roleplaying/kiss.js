const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
var request = require("request");
const url = "https://nekos.life/api/v2/img/kiss";
class KissCommand extends Command {
  constructor(client) {
    super (client, {
      name: "kiss",
      aliases: ["ks"],
      group: "roleplaying",
      memberName: "kiss",
      description: "You are so beautiful...Let me give you a kiss",
      guildOnly: true,
      args: [{
        key: "member",
        label: "user",
        type: "member",
        prompt: "Mention who do you want Give A Kiss To, master!"
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
        var embed = new RichEmbed().setTitle(`${msg.author.username} gave ${user.username} a Kiss`).setImage(imageurl).setColor(0xFF0090);
        msg.channel.send(embed);
      }
    });
  }
}

module.exports = KissCommand;