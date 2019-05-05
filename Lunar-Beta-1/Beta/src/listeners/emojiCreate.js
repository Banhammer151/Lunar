var { RichEmbed } = require('discord.js')
exports.run = async (user) => {
  var guildConf = await user.client.db.getGuild(user.guild.id)
    if (guildConf.eventLog == true) {
      var { RichEmbed } = require("discord.js")
      var embedEventolog = new RichEmbed()
      .setColor(0xFF00F0)
      .setTitle("New emoji!")
      .addField("Name", ""+ user.name +" ("+ user.id +")")
      .setAuthor("Kanori Event-log")
      .setImage(user.url)
      user.client.guilds.get(user.guild.id).channels.get(guildConf.eventLogChannel).send(embedEventolog)
    }
}