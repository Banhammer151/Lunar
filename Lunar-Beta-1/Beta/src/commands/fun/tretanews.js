var { Command } = require('discord.js-commando');
var { tretanews } = require('../../util/CanvasCommand');
var { Attachment } = require('discord.js');
class TretaCommand extends Command {
  constructor (client) {
    super (client, {
      name: "tretanews",
      aliases: ['treta', 'fluffy'],
      description: "BR Meme.",
      group: "fun",
      memberName: "tretanews",
      args: [{ key: "word", type: "string", prompt: "What will be the video title?" }]
    });
  }
  async run (msg, { word }) {
    tretanews(word).then(a => {
      var b = new Attachment(a, "canvas-gostoso.jpg");
      msg.channel.send(b);
    });
  }
}
module.exports = TretaCommand;