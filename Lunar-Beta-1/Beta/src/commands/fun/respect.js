var { Command } = require('discord.js-commando');
var { respect } = require('../../util/CanvasCommand');
var { Attachment } = require('discord.js');

class RespectCommand extends Command {
  constructor (client) {
    super (client, {
      name: "respect",
      aliases: ['payrespect'],
      description: "Press X to pay respects",
      group: "fun",
      memberName: "respect",
     // args: [{ key: "user", type: "user", prompt: "Who died?" }]
    });
  }
  async run (msg) {
    var url
    var mention = msg.mentions.users.first()
    if (mention) {
      url = mention.avatarURL.replace('.gif', '.jpg');
    } else {
      if (!msg.attachments.first()) return msg.channel.send("Please ping a user or attach a image.");
      url = msg.attachments.first().url
      if (url.endsWith('.gif')) url = url.replace('.gif', '.jpg')
    }
    respect(url).then(a => {
      var b = new Attachment(a, "canvas-gostoso.jpg");
      msg.channel.send(b);
    });
  }
}
module.exports = RespectCommand;