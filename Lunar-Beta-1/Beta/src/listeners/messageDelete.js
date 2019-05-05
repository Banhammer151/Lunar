var { RichEmbed } = require('discord.js')
exports.run = async (msg) => {
  var guildConf = await msg.client.db.getGuild(msg.guild.id)
    if (guildConf.eventLog == true && msg.author.id !== msg.client.user.id) {
      var { RichEmbed } = require("discord.js")
      var embedEventolog = new RichEmbed()
      .setColor(0xFF00F0)
      .setTitle("Deleted message!")
      .setDescription("**Channel:** <#"+ msg.channel.id +">\n**User:** <@"+ msg.author.id +">")
      .addField("Message content", "```"+ msg.content +"```")
      .setFooter("User ID: "+ msg.author.id)
      .setAuthor("Kanori Event-log")
      msg.guild.channels.get(guildConf.eventLogChannel).send(embedEventolog)
    }
    if (!msg.mentions.users.first()) return;
    var alreadyCheck = []
    msg.mentions.users.forEach(async (user) => {
    if (!alreadyCheck.includes(user.id) && user.id !== msg.author.id && !msg.author.bot) {
      var userPfp = await msg.client.db.getUser(user.id)
      if (userPfp.mentionWarn) {
        var embed = new RichEmbed()
        .setTitle("Someone mention you and deleted it!")
        .setColor(0xFF0000)
        .setThumbnail(msg.author.displayAvatarURL)
        .setDescription("**Message content**\n"+ msg.content)
        .addField("User: `"+ msg.author.tag +"("+ msg.author.id +")`", "Guild: `"+ msg.guild.name +"`")
        try {
          msg.client.users.get(user.id).send(embed)
        } catch (e) {}
        alreadyCheck.push(user.id)
      }
    }
  });
}