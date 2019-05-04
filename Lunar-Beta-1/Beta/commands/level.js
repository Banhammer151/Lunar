exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const key = `${message.guild.id}-${message.author.id}`;
  //const percent = Math.floor(0.1 * Math.sqrt(client.points.get(key, "points")));
  return message.channel.send(`You are level ${client.points.get(key, "level")}!`);
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};
  
exports.help = {
  name: "level",
  category: "Fun",
  description: "A RPG MMO style for discord. What are you, an adventurer?",
  usage: "level"
};
  
