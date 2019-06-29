const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
var request = require("request");
const url = "https://nekos.life/api/v2/img/hug";
class HugCommand extends Command {
  constructor(client) {
    super (client, {
      name: "hug",
      aliases: ["hg"],
      group: "roleplaying",
      memberName: "hug",
      description: "You are so beautiful...Let me give you a hug",
      guildOnly: true,
      args: [{
        key: "member",
        label: "user",
        type: "member",
        prompt: "Mention who do you want hug, master!"
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
        var embed = new RichEmbed().setTitle(`${msg.author.username} gave ${user.username} a hug`).setImage(imageurl).setColor(0xFF0090);
        msg.channel.send(embed);
      }
    });
  }
}

module.exports = HugCommand;