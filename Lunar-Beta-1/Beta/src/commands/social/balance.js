const { Command } = require('discord.js-commando');

class BalanceCommand extends Command {
  constructor (client) {
    super (client, {
      name: "balance",
      aliases: ["money"],
      group: "social",
      memberName: "balance",
      throttling: {
        usages: 2,
        duration: 5
      },
      description: "Are you rich?",
      examples: ['balance @user'],
      guildOnly: false,
      args: [{
        key: 'user',
        label: 'text',
        prompt: "Please enter the user",
        type: "user"
      }]
    });
  }
  async run (msg, { user }) {
    var id = user.id
    var userConf = await msg.client.db.getUser(id)
    msg.channel.send(`\`${user.tag}\` has ${userConf.money} coins!`)
  }
}

module.exports = BalanceCommand;