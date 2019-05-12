/* eslint-disable linebreak-style */
var { RichEmbed } = require("discord.js");
exports.run = async (membr) => {
  
  var guildConf = await membr.client.db.getGuild( membr.guild.id);
  if (guildConf.eventLog == true) {
    var embedEventolog = new RichEmbed()
      .setColor(0xFF00F0)
      .setTitle("New user joined!")
      .addField("Username", ""+ membr.user.username +" ("+ membr.user.id +")")
      .setAuthor("Lunar Event-log")
      .setThumbnail(membr.user.displayAvatarURL);
    membr.client.guilds.get(membr.guild.id).channels.get(guildConf.eventLogChannel).send(embedEventolog);
  }
  if (guildConf.welcomeMsgEn == true) {
    const welcomemssg = guildConf.welcomemsg.replace("{{user}}", membr.user.username);
    var embedWelcomeMessage = new RichEmbed()
      .setColor(0xFF00F0)
      .setTitle("New user joined!")
      .addField("Username", `${welcomemssg}`)
      .setAuthor(`${membr.user.username}`)
      .setThumbnail(membr.user.displayAvatarURL);
    membr.client.guilds.get(membr.guild.id).channels.get(guildConf.welcomeMsgChannel).send(embedWelcomeMessage);
  }
  
};