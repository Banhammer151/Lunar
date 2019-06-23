const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
var request = require("request");
const url = "https://nekos.life/api/v2/img/tickle";
class TickleCommand extends Command {
  constructor(client) {
    super (client, {
      name: "tickle",
      aliases: ["tk"],
      group: "roleplaying",
      memberName: "tickle",
      description: "You are so beautiful...Let me Tickle You",
      guildOnly: true,
      args: [{
        key: "member",
        label: "user",
        type: "member",
        prompt: "Mention who do you want to tickle, master!"
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
        var embed = new RichEmbed().setTitle(`${msg.author.username} Tickled ${user.username}`).setImage(imageurl).setColor(0xFF0090);
        msg.channel.send(embed);
      }
    });
  }
}

module.exports = TickleCommand;