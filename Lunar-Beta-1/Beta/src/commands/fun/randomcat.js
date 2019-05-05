const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js');
var cats = require("cats-js");
var c = new cats();
 

class CatCommand extends Command {
  constructor (client) {
    super (client, {
      name: "randomcat",
      aliases: ["cat", "rcat"],
      group: "fun",
      throttling: {
        usages: 2,
        duration: 10
      },
      memberName: "randomcat",
      description: "Who doesn't love cat pictures...",
      guildOnly: false
    });
  }
  async run (msg) {
    c.get().then((url) => {
      var embed = new RichEmbed()
      .setTitle("😻🐈")
      .setColor(0xFF00F0)
      .setImage(url.images.image.url)
      return msg.channel.send(embed);
    });
  }
}

module.exports = CatCommand;