const Discord = require("discord.js");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
 
  let target;
  try {
    target = message.mentions.users.first() || client.users.get(args[0]) || await client.fetchUser(args[0]);
  // eslint-disable-next-line no-empty
  } catch (e) { }
  const member = message.guild.member(target);
  const key = `${message.guild.id}-${member.id}`;
  
  
  message.reply("Setting count to **0**").then((msg)=> {
    client.warnings.set(key, 0, "warnings")
    msg.edit(`Successfully Edited ${member} Warnings to **0**`);
  }).catch(()=>{
    message.reply("Opps Something Went Wrong")
  });
};
      
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rs"],
  permLevel: "Administrator"
};
      
exports.help = {
  name: "resetwarnings",
  category: "Moderation",
  description: "check warnings",
  usage: "resetwarnings @user"
};
      