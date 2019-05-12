const { Command } = require("discord.js-commando");
const fetch = require("node-fetch");
class FactCommand extends Command {
  constructor(client) {
    super (client, {
      name: "randomfact",
      aliases: ["fact"],
      group: "fun",
      memberName: "randomfact",
      throttling: {
        usages: 3,
        duration: 3
      },
      description: "A random fact",
      guildOnly: false,
    });
  }
  async run(msg) {
    fetch("https://nekos.life/api/v2/fact").then(res => res.json())
      .then(json => {        
        return msg.channel.send(json.fact);
      }).catch(() => msg.channel.send("Try again."));
   
      
    
  }
}

module.exports = FactCommand;