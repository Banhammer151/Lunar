/* eslint-disable linebreak-style */
const Discord = require("discord.js");
module.exports = async (client, guild, user) => {
  const settings = client.getSettings(user.guild);
  const modlog = settings.modLogChannel;
  const logs = guild.channels.find(channel => channel.name === modlog);
  if (guild.me.hasPermission("MANAGE_CHANNELS") && !logs) {
    guild.channels.create(modlog, "text");
  }
  if (!guild.me.hasPermission("MANAGE_CHANNELS") && !logs) {
    console.log("The logs channel does not exist and tried to create the channel but I am lacking permissions");
  }
  //const ayy = client.emojis.get(`${emoji.id}`);
  const embed = new Discord.RichEmbed()
    .addField("**[User UnBanned]**", `User: ${user}`)
    .setTimestamp()
    .setColor("Red")
    .setFooter("Info Sent By Lunar Bot");
  guild.channels.find(channel => channel.name === modlog).send(embed);
};