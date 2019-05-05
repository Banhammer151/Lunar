var { Command } = require('discord.js-commando');
var { googleIt } = require('../../util/CanvasCommand');
var { Attachment } = require('discord.js');
class GoogleITCommand extends Command {
  constructor (client) {
    super (client, {
      name: "googleit",
      description: "Make a fake search on google!",
      group: "fun",
      memberName: "googleit",
      args: [{ key: "word", type: "string", prompt: "What the screenshot should say?" }]
    });
  }
  async run (msg, { word }) {
    googleIt(word).then(a => {
      var b = new Attachment(a, "canvas-gostoso.jpg");
      msg.channel.send(b);
    });
  }
}
module.exports = GoogleITCommand;