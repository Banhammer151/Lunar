var { Command } = require('discord.js-commando');
var { firstWord } = require('../../util/CanvasCommand');
var { Attachment } = require('discord.js');
class FirstWCommand extends Command {
  constructor (client) {
    super (client, {
      name: "firstwords",
      aliases: ['primeiraspalavras', 'firstwords'],
      description: "Your first word... Wait? What?",
      group: "fun",
      memberName: "firstwords",
      args: [{ key: "word", type: "string", prompt: "What the baby should say?" }]
    });
  }
  async run (msg, { word }) {
    firstWord(word).then(a => {
      var b = new Attachment(a, "canvas-gostoso.jpg");
      msg.channel.send(b);
    });
  }
}
module.exports = FirstWCommand;