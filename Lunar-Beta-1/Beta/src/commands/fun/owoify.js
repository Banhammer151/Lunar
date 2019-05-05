const { Command } = require('discord.js-commando');
const { get } = require('snekfetch')
class OwoCommand extends Command {
  constructor (client) {
    super (client, {
      name: "owoify",
      aliases: ["owo"],
      group: "fun",
      memberName: "owoify",
      throttling: {
        usages: 3,
        duration: 3
      },
      description: "Make owo text",
      guildOnly: false,
      args: [{
        key: 'text',
        type: 'string',
        prompt: "owo"
      }]
    });
  }
  async run (msg, { text }) {
    get("https://nekos.life/api/v2/owoify?text="+ encodeURIComponent(text)).then(socorro => {
      return msg.channel.send(socorro.body.owo)
    }).catch(e => msg.channel.send("Try again."));
  }
}

module.exports = OwoCommand;