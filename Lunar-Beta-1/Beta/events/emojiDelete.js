/* eslint-disable linebreak-style */
const Discord = require("discord.js");
module.exports = async (client, emoji) => {
  const settings = client.getSettings(emoji.guild);
  const modlog = settings.modLogChannel;
  const logs = emoji.guild.channels.find(channel => channel.name === modlog);
  if (emoji.guild.me.hasPermission("MANAGE_CHANNELS") && !logs) {
    emoji.guild.channels.create(modlog, "text");
  }
  if (!emoji.guild.me.hasPermission("MANAGE_CHANNELS") && !logs) {
    console.log("The logs channel does not exist and tried to create the channel but I am lacking permissions");
  }
  //const ayy = client.emojis.get(`${emoji.id}`);
  const embed = new Discord.RichEmbed()
    .addField("**[Emoji Deleted]**", "An Emoji Has Been Deleted")
    .setTimestamp()
    .setColor("Red")
    .setFooter("Info Sent By Lunar Bot");
  emoji.guild.channels.find(channel => channel.name === modlog).send(embed);
};