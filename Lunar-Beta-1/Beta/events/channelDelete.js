/* eslint-disable linebreak-style */
const Discord = require("discord.js");
module.exports = async (client, channel) => {
  const settings = client.getSettings(channel.guild);
  const modlog = settings.modLogChannel;
  //const logs = channel.guild.channels.find(channel => channel.name === "lunar-logs");
  if (!channel.guild.me.hasPermission("MANAGE_CHANNELS") && !modlog) {
    console.log("The logs channel does not exist and tried to create the channel but I am lacking permissions");
  }
  const entry = await channel.guild.fetchAuditLogs({ type: "CHANNEL_DELETE" }).then(audit => audit.entries.first());
  let user = "";
  if ((entry.createdTimestamp > (Date.now() - 5000))) {
    user = entry.executor.username;
  }
  const serverid = channel.guild.id;
  const guild = client.guilds.get(serverid);
  const modlogembed = new Discord.RichEmbed()
    .setColor("#0099ff")
    .setTitle(`A Channel ${channel.name} has been Deleted`)
    .addField("Category", `${channel.parent}`)
    .addField("Deleted By", `${user}`)
    .setTimestamp()
    .setFooter("Info Provided By Lunar Bot");
  // eslint-disable-next-line no-shadow
  guild.channels.find(channel => channel.name === modlog).send(modlogembed);
};