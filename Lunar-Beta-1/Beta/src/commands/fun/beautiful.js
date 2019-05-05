const { Command } = require('discord.js-commando');
const snekfetch = require("snekfetch");

class BeautifulCommand extends Command {
  constructor (client) {
    super (client, {
      name: "beautiful",
      group: "fun",
      memberName: "beautiful",
      throttling: {
        usages: 2,
        duration: 5
      },
      description: "Oh... This is beautiful!",
      examples: ['beautiful someone'],
      guildOnly: false,
      args: [{
        key: 'user',
        prompt: "Please enter the user!",
        type: "user"
      }]
    });
  }
  async run (msg, { user }) {
    snekfetch.get("https://triggered-api.tk/api/v2/beautiful?url="+ user.displayAvatarURL).set({ Authorization: process.env.TRIGGEREDTOKEN }).then(link => {
      msg.channel.send({ files: [{ attachment: link.body, name: 'beautiful.jpg' }]});
    });
  }
}

module.exports = BeautifulCommand;