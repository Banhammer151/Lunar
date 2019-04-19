/* eslint-disable linebreak-style */
const Discord = require("discord.js");
module.exports = async (client, oldChannel, newChannel) => {
  const settings = client.getSettings(newChannel.guild);
  const modlog = settings.modLogChannel;
  //const logs = channel.guild.channels.find(channel => channel.name === "lunar-logs");
  if (!newChannel.guild.me.hasPermission("MANAGE_CHANNELS") && !modlog) {
    console.log("The logs channel does not exist and tried to create the channel but I am lacking permissions");
  }
  const entry = await newChannel.guild.fetchAuditLogs({ type: "CHANNEL_UPDATE" }).then(audit => audit.entries.first());
  let user = "";
  if ((entry.createdTimestamp > (Date.now() - 5000))) {
    user = entry.executor.username;
  }
  const serverid = newChannel.guild.id;
  const guild = client.guilds.get(serverid);
  const modlogembed = new Discord.RichEmbed()
    .setColor("#0099ff")
    .setTitle(`A Channel ${oldChannel.name} has been Updated`)
    .addField("New Name", `${newChannel.name}`)
    .addField("Category", `${newChannel.parent}`)
    .addField("Updated By", `${user}`)
    .setTimestamp()
    .setFooter("Info Provided By Lunar Bot");
  // eslint-disable-next-line no-shadow
  guild.channels.find(channel => channel.name === modlog).send(modlogembed);
};