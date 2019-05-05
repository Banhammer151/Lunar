const { Command } = require('discord.js-commando');
const snekfetch = require("snekfetch");

class InvertCommand extends Command {
  constructor (client) {
    super (client, {
      name: "invert",
      group: "fun",
      memberName: "invert",
      throttling: {
        usages: 2,
        duration: 5
      },
      description: "Invert a user avatar",
      examples: ['invert someone'],
      guildOnly: false,
      args: [{
        key: 'user',
        prompt: "Please enter the user!",
        type: "user"
      }]
    });
  }
  async run (msg, { user }) {
    snekfetch.get("https://triggered-api.tk/api/v2/invert?url="+ user.displayAvatarURL).set({ Authorization: process.env.TRIGGEREDTOKEN }).then(link => {
      msg.channel.send({ files: [{ attachment: link.body, name: 'invert.jpg' }]});
    });
  }
}

module.exports = InvertCommand;