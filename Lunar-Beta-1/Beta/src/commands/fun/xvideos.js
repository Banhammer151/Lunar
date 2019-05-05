var { Command } = require('discord.js-commando');
var { xvideos } = require('../../util/CanvasCommand');
var { Attachment } = require('discord.js');
class LaranjoCommand extends Command {
  constructor (client) {
    super (client, {
      name: "xvideos",
      description: "Make a fake porn",
      group: "fun",
      memberName: "xvideos",
      args: [{ key: "word", type: "string", prompt: "What will be the title of this video?" }]
    });
  }
  async run (msg, { word }) {
    let url;
    if (!msg.attachments.first()) {
      url = msg.author.displayAvatarURL;
    } else {
      url = msg.attachments.first().url.replace('.gif', '.jpg')
    }
    xvideos(word, url).then(a => {
      var b = new Attachment(a, "canvas-gostoso.jpg");
      msg.channel.send(b);
    });
  }
}
module.exports = LaranjoCommand;