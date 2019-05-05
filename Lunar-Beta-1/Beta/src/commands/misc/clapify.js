const { Command } = require("discord.js-commando");

const clapifyer = function(string) {
    var array = string.split("")
    return array.join(" 👏 ");
}

class ClapifyCommand extends Command {
  constructor (client) {
    super (client, {
      name: "clapify",
      aliases: ["clap"],
      description: "Make:clap:clapifyed:clap:text.",
      memberName: "clapify",
      group: "misc",
      args: [{ key: "phrase", prompt: "What I should turn into claps?", type: "string" }]
    });
  }
  async run (msg, { phrase }) {
    msg.channel.send(clapifyer(phrase));
  }
}
module.exports = ClapifyCommand