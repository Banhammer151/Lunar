const { Command } = require('discord.js-commando');
const snekfetch = require("snekfetch");

class TriggeredCommand extends Command {
  constructor (client) {
    super (client, {
      name: "triggered",
      group: "fun",
      memberName: "triggered",
      throttling: {
        usages: 2,
        duration: 5
      },
      description: "Turn a avatar of someone into triggered mode",
      examples: ['triggered someone'],
      guildOnly: false,
      args: [{
        key: 'user',
        prompt: "Please enter the user!",
        type: "user"
      }]
    });
  }
  async run (msg, { user }) {
    snekfetch.get("https://triggered-api.tk/api/v2/triggered?url="+ user.displayAvatarURL).set({ Authorization: process.env.TRIGGEREDTOKEN }).then(link => {
      msg.channel.send({ files: [{ attachment: link.body, name: 'triggered.gif' }]});
    });
  }
}

module.exports = TriggeredCommand;