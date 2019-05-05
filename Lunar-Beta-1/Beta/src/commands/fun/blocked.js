var { Command } = require('discord.js-commando');
var { falso } = require('../../util/CanvasCommand');
var { Attachment } = require('discord.js');
class BlockCommand extends Command {
  constructor (client) {
    super (client, {
      name: "blocked",
      aliases: ['userrage', 'block'],
      description: "i HATE YOU AAAA",
      group: "fun",
      memberName: "blocked",
      args: [{ key: "owo", type: "user", prompt: "Who you blocked?" }]
    });
  }
  async run (msg, { owo }) {
    falso(owo.displayAvatarURL).then(a => {
      var b = new Attachment(a, "canvas-gostoso.jpg");
      msg.channel.send(b);
    });
  }
}
module.exports = BlockCommand;