var { Command } = require('discord.js-commando');
var { laranjo } = require('../../util/CanvasCommand');
var { Attachment } = require('discord.js');
class LaranjoCommand extends Command {
  constructor (client) {
    super (client, {
      name: "laranjo",
      description: "vo come seo ku",
      group: "fun",
      memberName: "laranjo",
      args: [{ key: "word", type: "string", prompt: "What the laranjo should say?" }]
    });
  }
  async run (msg, { word }) {
    laranjo(word).then(a => {
      var b = new Attachment(a, "canvas-gostoso.jpg");
      msg.channel.send(b);
    });
  }
}
module.exports = LaranjoCommand;