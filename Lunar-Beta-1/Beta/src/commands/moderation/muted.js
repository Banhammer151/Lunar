const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js')
class MutedCommand extends Command {
  constructor (client) {
    super (client, {
      name: "muted",
      aliases: ["mutedusers"],
      group: "moderation",
      memberName: "muted",
      throttling: {
        usages: 2,
        duration: 5
      },
      description: "Check users muted.",
      guildOnly: true,
    });
  }
  async run (msg, args) {
    var i = 0;
    var user = []
    var kdole = msg.guild.roles.find('name', 'Kanori Muted')
    if (!kdole) return msg.channel.send(":x: | I don't found `Kanori Muted` role! Mute someone to auto-create this role.");
    kdole.members.forEach(async g => {
      await user.push(g.user.tag)
    });
    if (user.length <= 0) return msg.channel.send(":x: | No muted users found.")
    var embed = new RichEmbed()
    embed.setTitle("Users muted with Kanori | "+ user.length +" user(s) ")
    embed.setColor(0xFF00F0)
    embed.setFooter(msg.guild.name, msg.guild.iconURL)
    while (i < user.length) {
      i++
      var numer = i
      i--
      await embed.addField("User #"+ numer, "`"+ user[i] +"`")
      i++;
    }
    msg.channel.send(embed)
  }
}

module.exports = MutedCommand;