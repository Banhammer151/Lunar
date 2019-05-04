exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const msg = await message.channel.send("Ping?");
  msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "ping",
  category: "Miscelaneous",
  description: "You ping, it pongs. Though, it isn't acutal Ping Pong. What are you a fool?",
  usage: "ping"
};
