/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const Discord = require("discord.js");
exports.run = async (client, message, [...value], level) => { // eslint-disable-line no-unused-vars
  const rolekey = value.join(" ");
  const role  = message.guild.roles.find(role => role.name === rolekey);
  const list = client.guilds.get(message.guild.id); 
  if (role) {
    try {
      list.members.forEach((member) => {
        member.addRole(role).catch(console.error).then(() => {
        // We let the message author know we were able to kick the person
        });
      });
     

    } catch (err) {
      // An error happened
      // This is generally due to the bot not being able to kick the member,
      // either due to missing permissions or role hierarchy
      message.reply("I was unable to Add The Role");
      // Log the error
      console.error(err);
    }
  
  }
};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Trial Mod"
};
  
exports.help = {
  name: "addroleeveryone",
  category: "Moderation",
  description: "Kicks A member From the Guild",
  usage: "addroleeveryone role"
};
  