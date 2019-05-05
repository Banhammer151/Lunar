exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const key = `${message.guild.id}-${message.author.id}`;
  //const percent = Math.floor(0.1 * Math.sqrt(client.points.get(key, "points")));
  return message.channel.send(`You Currently Have ${client.money.get(key, "money")} Woot!`);
};
    
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};
    
exports.help = {
  name: "money",
  category: "Fun",
  description: "Money! Wait, it's fake money for discord. Still good enough.",
  usage: "money"
};
    
