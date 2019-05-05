const { Command } = require("discord.js-commando");

const vaporwaver = function(string) {
    var array = string.split("")
    return array.join("  ");
}

class VaporwaveCommand extends Command {
  constructor (client) {
    super (client, {
      name: "vaporwave",
      aliases: ["wave"],
      description: "M  a  k  e   v  a  p  o  r  w  a  v  e   t  e  x  t.",
      memberName: "vaporwave",
      group: "misc",
      args: [{ key: "phrase", prompt: "What i should turn into vaporwave?", type: "string" }]
    });
  }
  async run (msg, { phrase }) {
    msg.channel.send(vaporwaver(phrase));
  }
}
module.exports = VaporwaveCommand