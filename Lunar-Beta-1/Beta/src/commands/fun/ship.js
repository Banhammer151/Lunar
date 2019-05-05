var { Command } = require('discord.js-commando');
var { ship } = require('../../util/CanvasCommand');
var { Attachment } = require('discord.js');
class ShipCommand extends Command {
  constructor (client) {
    super (client, {
      name: "ship",
      description: "The best husband!",
      group: "fun",
      memberName: "ship",
      args: [{ key: "user1", type: "user", prompt: "Enter the first user" }, { key: 'user2', prompt: 'Enter another user', type: 'user' }]
    });
  }
  async run (msg, { user1, user2 }) {
    var percentagem = user1.username.length + user2.username.length * 1.5;
    let frase = " ";
    if (percentagem >= 100) percentagem = 101;
    if (percentagem > 100) frase = "Wow... Just... wow."
    var shipname = user1.username.substr(0, 5) + user2.username.toLowerCase().substr(0, 2);
    ship(percentagem, user1.avatarURL, user2.avatarURL).then(a => {
      msg.channel.send("**Ship name: **"+ shipname +"\n"+frase+"\n**Percentage:** "+ percentagem +"%", { files: [{ attachment: a, name: "ship.jpg" }]});
    });
  }
}
module.exports = ShipCommand;