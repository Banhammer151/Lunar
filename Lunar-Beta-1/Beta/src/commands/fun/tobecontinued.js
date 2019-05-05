const { Command } = require('discord.js-commando');
const snekfetch = require("snekfetch");

class ContinuaCommand extends Command {
  constructor (client) {
    super (client, {
      name: "tobecontinued",
      group: "fun",
      aliases: ['tbc'],
      memberName: "tobecontinued",
      throttling: {
        usages: 2,
        duration: 5
      },
      description: "Turn a avatar of someone into to be continued mode",
      examples: ['tobecontinued someone'],
      guildOnly: false,
      args: [{
        key: 'user',
        prompt: "Please enter the user!",
        type: "user"
      }]
    });
  }
  async run (msg, { user }) {
    snekfetch.get("https://triggered-api.tk/api/v2/tobecontinued?url="+ user.displayAvatarURL).set({ Authorization: process.env.TRIGGEREDTOKEN }).then(link => {
      msg.channel.send({ files: [{ attachment: link.body, name: 'tobecontinued.jpg' }]});
    });
  }
}

module.exports = ContinuaCommand;