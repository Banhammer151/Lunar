const { Command } = require('discord.js-commando');
var math = require('mathjs');

class MathCommand extends Command {
  constructor (client) {
    super (client, {
      name: "math",
      aliases: ["calc"],
      group: "util",
      memberName: "math",
      throttling: {
        usages: 2,
        duration: 5
      },
      description: "Do some math!",
      examples: ['math 2+2', 'math 3/4', 'math (2+2)*2'],
      guildOnly: false,
      args: [{
        key: 'op',
        label: 'op',
        prompt: "Please enter your operation master!",
        type: "string"
      }]
    });
  }
  async run (msg, args) {
    var op = args.op;
    try {
    return msg.channel.send("`"+ op +"` = `"+ math.eval(op) +"`!");
    } catch (e) {
      msg.channel.send("Invalid operation!");
    }
  }
}

module.exports = MathCommand;