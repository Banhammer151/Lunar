module.exports = {
  name: "stats",
  description: "Show the Current Stats of the Bot.",
  execute(message, args, client) {
    return message.channel.send(`Server count: ${client.guilds.size}`);
  },
};