var { RichEmbed } = require('discord.js')
exports.run = async (role) => {
  var guildConf = await role.client.db.getGuild(role.guild.id)
    if (guildConf.eventLog == true) {
      var { RichEmbed } = require("discord.js")
      var embedEventolog = new RichEmbed()
      .setColor(0xFF00F0)
      .setTitle("Role deleted!")
      .addField("Role name", ""+ role.name +"")
      .addField("Role HEX color", ""+ role.hexColor +"")
      .addField("Role permissions level", "```"+ role.permissions +"```")
      .setAuthor("Kanori Event-log")
      role.client.guilds.get(role.guild.id).channels.get(guildConf.eventLogChannel).send(embedEventolog)
    }
}