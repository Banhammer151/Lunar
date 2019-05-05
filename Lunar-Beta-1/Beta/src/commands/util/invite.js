const { Command } = require('discord.js-commando');

class InviteCommand extends Command {
  constructor (client) {
    super (client, {
      name: "invite",
      group: "util",
      memberName: "invite",
      description: "My invite to add me on your server!",
      guildOnly: false,
    });
  }
  async run (msg) {
    var { RichEmbed } = require ('discord.js');
    var embed = new RichEmbed ()
    .setTitle("Add Kanori to your guild!")
    .setDescription("You can add me [clicking here!](https://discordapp.com/api/oauth2/authorize?client_id=461552010240589824&permissions=8&scope=bot) ")
    .addField(":warning: Warning", "In order to use all functions, you need give me the Administrator permission.")
    .setColor(0xFF00F0)
    msg.channel.send(embed)
  }
}

module.exports = InviteCommand;