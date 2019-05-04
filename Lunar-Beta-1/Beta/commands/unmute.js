/* eslint-disable linebreak-style */
const Discord = require("discord.js");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const mutedrole  = message.guild.roles.find(role => role.name === "Muted");  
  const user = message.mentions.users.first();
  const settings = client.getSettings(message.guild);
  const actionlog = settings.actionLog;
  if (user) {
    const member = message.guild.member(user);
    if (!member.roles.has(mutedrole.id)) return message.reply("User is Not Muted");
    if (member) {
      member.removeRole(mutedrole).catch(console.error).then(() => {
       
        message.reply(`Successfully unmuted ${user.tag}`);
      }).then(()=>{
        const embed = new Discord.RichEmbed()
          .setTitle("User Muted")
          .setColor("RED")
          .setFooter("Info Sent By Lunar")
          .addField("Muted", `${user.tag}`)
          .addField("Muted By", `${message.author.tag}`);
        message.guild.channels.find(channel => channel.name === actionlog).send(embed);
      }).catch(err => {
        message.reply("I was unable to unMute The Member");
        console.error(err);
      });
    } else {
      // The mentioned user isn't in this guild
      message.reply("That user isn't in this guild!");
    }
    // Otherwise, if no user was mentioned
  } else {
    message.reply("You didn't mention the user to unMute!");
  }
  
};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Trial Mod"
};
  
exports.help = {
  name: "unmute",
  category: "Moderation",
  description: "unmute A member From the Guild",
  usage: "unmute @user"
};
  