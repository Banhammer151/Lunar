const { Command } = require('discord.js-commando');
const { get } = require('snekfetch')
class FactCommand extends Command {
  constructor (client) {
    super (client, {
      name: "randomfact",
      aliases: ["fact"],
      group: "fun",
      memberName: "randomfact",
      throttling: {
        usages: 3,
        duration: 3
      },
      description: "A random fact",
      guildOnly: false,
    });
  }
  async run (msg) {
    get("https://nekos.life/api/v2/fact").then(socorro => {
      return msg.channel.send(socorro.body.fact)
    }).catch(e => msg.channel.send("Try again."));
  }
}

module.exports = FactCommand;