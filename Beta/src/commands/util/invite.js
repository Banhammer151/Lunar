/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const { Command } = require("discord.js-commando");

class InviteCommand extends Command {
  constructor(client) {
    super (client, {
      name: "invite",
      group: "util",
      memberName: "invite",
      description: "My invite to add me on your server!",
      guildOnly: false,
    });
  }
  async run(msg) {
    var { RichEmbed } = require ("discord.js");
    var embed = new RichEmbed ()
      .setTitle("Add Lunar to your guild!")
      .setDescription("You can add me [clicking here!](https://discordapp.com/oauth2/authorize?&client_id=480838566470221854&scope=bot&permissions=8) ")
      .addField(":warning: Warning", "In order to use all functions, you need give me the Administrator permission.")
      .setColor(0xFF00F0);
    msg.channel.send(embed);
  }
}

module.exports = InviteCommand;