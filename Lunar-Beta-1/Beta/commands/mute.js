/* eslint-disable linebreak-style */
const Discord = require("discord.js");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const mutedrole  = message.guild.roles.find(role => role.name === "Muted");
  const settings = client.getSettings(message.guild);
  const actionlog = settings.actionLog;
  if (!mutedrole) {
    message.guild.createRole({
      name: "Muted",
      color: "GREY",
    }).then(() =>{
      message.guild.channels.forEach((channel) => {
        channel.overwritePermissions(mutedrole, {
          SEND_MESSAGES: false
        })         
          .catch(console.error);
      });
    }).catch(message.reply("I dont Have Permisson to Update Roles or Channels"));
  }  
  const user = message.mentions.users.first();
  // If we have a user mentioned
  if (user) {
    // Now we get the member from the user
    const member = await message.guild.member(user);
    if (member.roles.has(mutedrole.id)) return message.reply("User is Already Muted");
    if (member) {
      member.addRole(mutedrole).then(() => {
        // We let the message author know we were able to kick the person
        message.reply(`Successfully muted ${user.tag}`);
      }).then(()=>{
        const embed = new Discord.RichEmbed()
          .setTitle("User Muted")
          .setColor("RED")
          .setFooter("Info Sent By Lunar")
          .addField("Muted", `${user.tag}`)
          .addField("Muted By", `${message.author.tag}`);
        message.guild.channels.find(channel => channel.name === actionlog).send(embed);
      }).catch(err => {
        message.reply("I was unable to Mute The Member");
        // Log the error
        console.error(err);
      });
    } else {
      // The mentioned user isn't in this guild
      message.reply("That user isn't in this guild!");
    }
    // Otherwise, if no user was mentioned
  } else {
    message.reply("You didn't mention the user to Mute!");
  }
  
};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Trial Mod"
};
  
exports.help = {
  name: "mute",
  category: "Moderation",
  description: "Grab the duct tape and turn a member into a mute in a guild.",
  usage: "mute @user"
};
  
