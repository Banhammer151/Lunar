const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

class ServerInfoCommand extends Command {
  constructor (client) {
    super (client, {
      name: "serverinfo",
      aliases: ["sinfo"],
      group: "util",
      memberName: "serverinfo",
      description: "Get info about a server",
      guildOnly: true
    });
  }
  async run (msg) {
    var cleanRoles = []
    var roles = msg.guild.roles.array()
    for (var i = 0; i < msg.guild.roles.array().length; i++) {
      if (cleanRoles.join(', ').length > 1000) {
        cleanRoles.pop()
        cleanRoles.push("etc")
        break
      }
      cleanRoles.push(roles[i].name)
    }
    var features = msg.guild.features
    if (!features[0]) features = "No features..."
    else features = features.join(', ')
    var veri = msg.guild.verificationLevel
    if (!veri) veri = "No verification."
    var embed = new RichEmbed ()
    .setTitle(msg.guild.name +"'s info")
    .setThumbnail(msg.guild.iconURL)
    .setColor(0xFF0090)
    .addField("Guild ID", msg.guild.id)
    .addField("Joined at", msg.guild.createdAt)
    .addField("I joined here at", msg.member.joinedAt)
    .addField("Owner", "`"+ msg.guild.owner.user.tag +"`")
    .addField("Features", features)
    .addField("Members", "🤖 Robots: "+ msg.guild.members.filter(m => m.user.bot).size +", 🙋 Humans: "+ msg.guild.members.filter(m => !m.user.bot).size +"\n<:online:438399398808911882> Online: "+ msg.guild.members.filter(m => m.presence.status == "online").size +"\n<:idle:438399398796460032> Idle: "+ msg.guild.members.filter(g => g.presence.status == "idle").size +"\n<:dnd:438399396548313091> DND: "+ msg.guild.members.filter(a => a.presence.status == "dnd").size +"\n<:offline:438399398762905600> Offline: "+ msg.guild.members.filter(o => o.presence.status == "offline").size)
    .addField("Channels", "📓 Text channels: "+ msg.guild.channels.filter(m => m.type == "text").size + "\n🎤 Voice channels: "+ msg.guild.channels.filter(m => m.type == "voice").size +"\n🎒 Category count: "+ msg.guild.channels.filter(j => j.type == "category").size)
    .addField("Verification Level", veri)
    .addField("Roles in this server", "```"+ cleanRoles.join(', ') +"```")
    return msg.channel.send(embed);
  }
}

module.exports = ServerInfoCommand;