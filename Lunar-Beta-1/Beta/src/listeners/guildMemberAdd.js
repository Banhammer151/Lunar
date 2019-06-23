/* eslint-disable linebreak-style */
// eslint-disable-next-line no-unused-vars
var { DateTime } = require("luxon");
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
   
    const welcomemssg = guildConf.welcomemsg.replace("{{user}}", membr.user.username).replace("{{pingme}}", membr);
    var embedWelcomeMessage = new RichEmbed()
      .setColor(0xFF00F0)
      .setTitle("New user joined!")
      .addField(`${membr}`, `${welcomemssg}`)
      .addField("Account Age", `${membr.user.createdAt}`)
      .setAuthor(`${membr.user.username}`)
      .setThumbnail(membr.user.displayAvatarURL);
    membr.client.guilds.get(membr.guild.id).channels.get(guildConf.welcomeMsgChannel).send(embedWelcomeMessage);
  }
  
};