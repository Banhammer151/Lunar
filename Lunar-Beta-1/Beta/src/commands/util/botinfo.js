const { Command } = require('discord.js-commando');

class BotInfoCommand extends Command {
  constructor (client) {
    super (client, {
      name: "botinfo",
      group: "util",
      memberName: "botinfo",
      description: "Some information",
      guildOnly: false,
    });
  }
  async run (msg) {
    var { RichEmbed } = require ('discord.js');
    var embed = new RichEmbed ()
    .setTitle(":wave: | Heya, My name is Kanori!")
    .setDescription("I'm a simple bot that do everything for you. My objective is be the most simple possible and fast. I'm using the Commando Framework with discord.js to interact with Discord and Canvas to manipulate images.")
    .addField("Link to Listcord", "https://listcord.com/bot/461552010240589824")
    .addField("Link to Discord Bots List", "https://discordbots.org/bot/461552010240589824")
    .addField("More info? Like, RAM memory or servers?", "Use k.stats")
    .setColor(0xFF00F0)
    msg.channel.send(embed)
  }
}

module.exports = BotInfoCommand;