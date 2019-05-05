const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

class AvatarCommand extends Command {
  constructor (client) {
    super (client, {
      name: "avatar",
      aliases: ["usericon"],
      group: "util",
      memberName: "avatar",
      description: "You are so beautiful...",
      guildOnly: false,
      args: [{
        key: "member",
        label: "user",
        type: 'member',
        prompt: "Mention who do you want see, master!"
      }]
    });
  }
  async run (msg, { member }) {
    var user = member.user;
    var embed = new RichEmbed().setTitle(user.username +"'s avatar").setImage(user.avatarURL).setColor(0xFF0090)
    msg.channel.send(embed);
  }
}

module.exports = AvatarCommand