const { Command } = require('discord.js-commando');

class SayCommand extends Command {
  constructor (client) {
    super (client, {
      name: "say",
      aliases: ["parrot"],
      group: "misc",
      memberName: "say",
      throttling: {
        usages: 2,
        duration: 5
      },
      description: "Make me say something",
      examples: ['say I\'m kawaii!', 'say Hey, master!', 'say Hello World'],
      guildOnly: false,
      args: [{
        key: 'text',
        label: 'text',
        prompt: "Please enter what i should say!",
        type: "string"
      }]
    });
  }
  async run (msg, args) {
    var phase = args.text;
    return msg.say(phase)
  }
}

module.exports = SayCommand;