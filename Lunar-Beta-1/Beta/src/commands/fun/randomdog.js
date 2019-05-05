const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js')
var sneky = require('snekfetch')

class DogCommand extends Command {
  constructor (client) {
    super (client, {
      name: "randomdog",
      aliases: ["dog", "rdog"],
      group: "fun",
      throttling: {
        usages: 2,
        duration: 10
      },
      memberName: "randomdog",
      description: "Who doesn't love dog pictures...",
      guildOnly: false
    });
  }
  async run (msg) {
   sneky.get("https://random.dog/woof.json").then(r => {
      var embed = new RichEmbed()
      .setTitle("🐶🐕")
      .setColor(0xFF00F0)
      .setImage(r.body.url)
      return msg.channel.send(embed);
    });
  }
}

module.exports = DogCommand;