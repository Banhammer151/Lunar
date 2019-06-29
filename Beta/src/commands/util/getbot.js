const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

class BotCommand extends Command {
  constructor(client) {
    super (client, {
      name: "getbot",
      aliases: ["fetchbot"],
      group: "util",
      memberName: "getbot",
      description: "Fetch a bot on DBL.",
      guildOnly: false,
      args: [{
        key: "idi",
        type: "user",
        prompt: "Mention or enter the id of the bot."
      }]
    });
  }
  async run(msg, { idi }) {
    var id = idi.id;
    var embed = new RichEmbed ();
    embed.setColor(0xFF00F0);
    msg.client.dbl.getBot(id).then(dblbot => {

     
       
      embed.setTitle(dblbot.username +" profile on DBL");
      embed.setDescription(dblbot.shortdesc);
      embed.addField("Libary", dblbot.lib);
      embed.addField("Prefix", dblbot.prefix);
      embed.addField("Tags", dblbot.tags.join(", "));
      return msg.channel.send(embed);
      
      
    });
  }
}

module.exports = BotCommand;