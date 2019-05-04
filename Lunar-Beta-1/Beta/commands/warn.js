const Discord = require("discord.js");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const settings = client.getSettings(message.guild);
  const actionlog = settings.actionLog;
  let target;
  try {
    target = message.mentions.users.first() || client.users.get(args[0]) || await client.fetchUser(args[0]);
  // eslint-disable-next-line no-empty
  } catch (e) { }
  const member = message.guild.member(target);
  const key = `${message.guild.id}-${member.id}`;
  const reason = args.join(" ");
  if (!reason) {
    return message.reply("Dont Forget a Reason!");
  }
  if (!target || !member) return message.reply("You Really wanna pat yourself?");
  const count = await client.warnings.get(key, "warnings") + 1;
  client.warnings.set(key, count, "warnings");
  message.channel.send(`${member} has been Warned`).then(()=>{
    const embed = new Discord.RichEmbed()
      .setTitle("User Warned")
      .setColor("RED")
      .setFooter("Info Sent By Lunar")
      .addField("Warned", `${member}`)
      .addField("Warned By", `${message.author.tag}`)
      .addField("Reason", `${reason}`);
    message.guild.channels.find(channel => channel.name === actionlog).send(embed);
  }).catch(err => {
    message.reply("Erro!s");
    console.error(err);
  });// Print the json response
};
      
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Trial Mod"
};
      
exports.help = {
  name: "warn",
  category: "Moderation",
  description: "self explanitory really",
  usage: "warn"
};
      