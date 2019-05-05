const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

class UserInfoCommand extends Command {
  constructor (client) {
    super (client, {
      name: "userinfo",
      aliases: ["uinfo"],
      group: "util",
      memberName: "userinfo",
      description: "Get some userinfo",
      guildOnly: true,
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
    var userStats = user.presence.status.split("")
    userStats[0] = userStats[0].toUpperCase()
    userStats = userStats.join("");
    var embed = new RichEmbed()
    .setTitle(user.tag +"'s info")
    .setThumbnail(user.avatarURL)
    .setColor(0xFF0090)
    .addField("User ID", user.id)
    .addField("Joined at", member.joinedAt)
    .addField("Playing", user.presence.game ? user.presence.game.name : 'None')
    .addField("Roles in this server", "```"+ member.roles.map(roles => roles.name).join(', ') +"```")
    .addField("Status", userStats)
    return msg.channel.send(embed);
  }
}

module.exports = UserInfoCommand;