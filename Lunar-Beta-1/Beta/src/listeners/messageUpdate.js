exports.run = async (oldmsg, msg) => {
  msg.content = msg.content.toLowerCase()
  oldmsg.content = oldmsg.content.toLowerCase()
  var guildConf = await msg.client.db.getGuild(msg.guild.id)
  if (guildConf.bwf.length > 0) {
    var alreadycheck = []
    guildConf.bwf.forEach(word => {
      if (!alreadycheck.includes(word)) {
        if (msg.content.includes(word)) {
          alreadycheck.push(word)
          try {
            msg.delete();
            return msg.channel.send("Hey <@"+ msg.author.id +">, this word is banned here. I don't want see you talking this, so...");
          } catch (e) {
            return msg.channel.send("Hey <@"+ msg.author.id +">, please don't speak this word here! (Tip: If you give me the MANAGE_MESSAGES permission, i will delete this message.)");
          }
        }
      }
    });
  }
  if (oldmsg.mentions.users.first()) {
    var alreadyCheck = []
    oldmsg.mentions.users.forEach(async (user) => {
    if (!alreadyCheck.includes(user.id) && user.id !== msg.author.id && !msg.author.bot && !msg.mentions.users.has(user.id)) {
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
  var guildConf = await msg.client.db.getGuild(msg.guild.id)
  if (guildConf.eventLog == true) {
    if (msg.author.bot) return
  var { RichEmbed } = require("discord.js")
  var embed = new RichEmbed()
  .setColor(0xFF00F0)
  .setTitle("Edited message!")
  .setDescription("**Channel:** <#"+ msg.channel.id +">\n**User:** <@"+ msg.author.id +">")
  .addField("Old message content", "```"+ oldmsg.content +"```")
  .addField("New message content", "```"+ msg.content +"```")
  .setFooter("User ID: "+ msg.author.id)
  .setAuthor("Kanori Event-log")
  msg.guild.channels.get(guildConf.eventLogChannel).send(embed)
}
}