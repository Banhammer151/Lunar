const { Command } = require("discord.js-commando");

const mock = function(string) {
    var chars = string.toUpperCase().split('');
    for (let i = 0; i < chars.length; i += 3) {
        chars[i] = chars[i].toLowerCase();
    }
    return chars.join('');
};

class MockCommand extends Command {
  constructor (client) {
    super (client, {
      name: "mock",
      description: "i Am A MIneCRaFt PLaYer!1!",
      memberName: "mock",
      group: "misc",
      args: [{ key: "phrase", prompt: "WhAt i sHouLD MoCK?", type: "string" }]
    });
  }
  async run (msg, { phrase }) {
    msg.channel.send(mock(phrase));
  }
}
module.exports = MockCommand