var { Command } = require('discord.js-commando');
var { nsei } = require('../../util/CanvasCommand');
var { Attachment } = require('discord.js');
class FirstWCommand extends Command {
  constructor (client) {
    super (client, {
      name: "nuncanemvi",
      aliases: ['nemvi'],
      description: "I neve seen this before...",
      group: "fun",
      memberName: "nuncanemvi",
      args: [{ key: "word", type: "string", prompt: "What i should say?" }]
    });
  }
  async run (msg, { word }) {
    nsei(word).then(a => {
      var b = new Attachment(a, "canvas-gostoso.jpg");
      msg.channel.send(b);
    });
  }
}
module.exports = FirstWCommand;