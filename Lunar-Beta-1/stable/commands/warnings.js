const Discord = require("discord.js");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
 
  let target;
  try {
    target = message.mentions.users.first() || client.users.get(args[0]) || await client.fetchUser(args[0]);
  // eslint-disable-next-line no-empty
  } catch (e) { }
  const member = message.guild.member(target);
  const key = `${message.guild.id}-${member.id}`;
 
  const count = await client.warnings.get(key, "warnings");
  message.channel.send(`${member} has **${count}** Warnings`).catch(err => {
    message.reply("Erro!s");
    console.error(err);
  });// Print the json response
};
      
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "user"
};
      
exports.help = {
  name: "warnings",
  category: "Moderation",
  description: "check warnings",
  usage: "warnings @user"
};
      