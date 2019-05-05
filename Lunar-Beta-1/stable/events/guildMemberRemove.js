const Discord = require("discord.js");
const moment = require("moment");

module.exports = async (client, member) => {
  // Load the guild's settings
  const settings = client.getSettings(member.guild);
  const modlog = settings.modLogChannel;
  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;

  //const welcomeChannel = member.guild.channels.find(c => c.name === settings.welcomeChannel);
  //if (!welcomeChannel) return;

  const fromNow = moment(member.joinedTimestamp).fromNow();
  const isNew = (new Date() - member.joinedTimestamp) < 60000 ? "\nWell that was a short visit!" : "";

  const embed = new Discord.RichEmbed()
    .setTitle("Member Leave")
    .setAuthor(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL)
    .setThumbnail(member.user.displayAvatarURL)
    .setDescription(`**Joined** : ${fromNow} ${isNew}`)
    .setColor("BLURPLE")
    .setTimestamp();
  member.guild.channels.find(channel => channel.name === modlog).send(embed);
};