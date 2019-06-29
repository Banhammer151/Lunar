const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");

class DogCommand extends Command {
  constructor(client) {
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
  async run(msg) {
    fetch("https://random.dog/woof.json").then(res => res.json())
      .then(json => {
        console.log(json.url);
        var embed = new RichEmbed()
          .setTitle("🐶🐕")
          .setColor(0xFF00F0)
          .setImage(json.url);
        return msg.channel.send(embed);
      });
    
    
  }
}

module.exports = DogCommand;