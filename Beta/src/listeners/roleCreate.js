/* eslint-disable linebreak-style */
var { RichEmbed } = require("discord.js");
exports.run = async (role) => {
  var guildConf = await role.client.db.getGuild(role.guild.id);
  if (guildConf.eventLog == true) {
    var embedEventolog = new RichEmbed()
      .setColor(0xFF00F0)
      .setTitle("New role!")
      .addField("Role name", ""+ role.name +"")
      .addField("Role HEX color", ""+ role.hexColor +"")
      .addField("Role permissions level", "```"+ role.permissions +"```")
      .setAuthor("Lunar Event-log");
    role.client.guilds.get(role.guild.id).channels.get(guildConf.eventLogChannel).send(embedEventolog);
  }
};