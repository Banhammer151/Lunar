/* eslint-disable linebreak-style */
const Discord = require("discord.js");
module.exports = async (client, oldChannel, newChannel) => {
  const settings = client.getSettings(newChannel.guild);
  const modlog = settings.modLogChannel;
  //const logs = channel.guild.channels.find(channel => channel.name === "lunar-logs");
  if (!newChannel.guild.me.hasPermission("MANAGE_CHANNELS") && !modlog) {
    console.log("The logs channel does not exist and tried to create the channel but I am lacking permissions");
  }
  let str = "";
  if (oldChannel.name != newChannel.name) {str += `? Name: \`${oldChannel.name}\` **->** \`${newChannel.name}\`\n`;}
  const embed = new Discord.RichEmbed()
    .addField("Channel Updated", `${str}? Channel ID: ${oldChannel.id}`)
    .setTimestamp()
    .setColor("Red")
    .setFooter("Info Sent By Lunar Bot");
    
  newChannel.guild.channels.find(channel => channel.name === modlog).send(`Channel ${oldChannel.name} was just updated`, embed);
};