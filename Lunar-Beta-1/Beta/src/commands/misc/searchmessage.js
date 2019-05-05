const { Command } = require('discord.js-commando');

class MessageSCommand extends Command {
  constructor (client) {
    super (client, {
      name: "searchmessage",
      aliases: ["message"],
      group: "misc",
      memberName: "searchmessage",
      throttling: {
        usages: 2,
        duration: 5
      },
      description: "Search a message on the actual channel.",
      examples: ['message 464785943652597760'],
      guildOnly: false,
      args: [{
        key: 'text',
        label: 'text',
        prompt: "Enter the ID of the message.",
        type: "string"
      }]
    });
  }
  async run (msg, args) {
    var id = args.text;
    var awa = await msg.channel.send("Searching.")
      var msgs = msg.channel.fetchMessage(id)
      if (!msgs) return msg.channel.send("I don't found a message with that ID on this channel.");
      var message = msgs
        msg.channel.createWebhook(message.author.username, message.author.displayAvatarURL).then(hook => {
          awa.delete()
          return hook.send(message.content)
        });
  
  }
}

module.exports = MessageSCommand;