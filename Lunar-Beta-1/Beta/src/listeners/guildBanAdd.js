var { RichEmbed } = require('discord.js')
exports.run = async (guild, user) => {
  var guildConf = await user.client.db.getGuild(guild.id)
    if (guildConf.eventLog == true) {
      var { RichEmbed } = require("discord.js")
      var embedEventolog = new RichEmbed()
      .setColor(0xFF00F0)
      .setTitle("New banned user!")
      .addField("Username", ""+ user.username +" ("+ user.id +")")
      .setAuthor("Kanori Event-log")
      user.client.guilds.get(guild.id).channels.get(guildConf.eventLogChannel).send(embedEventolog)
    }
}