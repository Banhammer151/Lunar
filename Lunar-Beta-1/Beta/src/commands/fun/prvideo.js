var { Command } = require('discord.js-commando');
var { fakePrVideo } = require('../../util/CanvasCommand');
var { Attachment } = require('discord.js');
class PRCommand extends Command {
  constructor (client) {
    super (client, {
      name: "prvideo",
      description: "Create a fake video of PR.",
      group: "fun",
      memberName: "prvideo",
      args: [{ key: "word", type: "string", prompt: "What will be the title of this video?" }]
    });
  }
  async run (msg, { word }) {
    fakePrVideo(word).then(a => {
      var b = new Attachment(a, "canvas-gostoso.jpg");
      msg.channel.send(b);
    });
  }
}
module.exports = PRCommand;