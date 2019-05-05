const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js')
var snek = require('snekfetch')

class BotCommand extends Command {
  constructor (client) {
    super (client, {
      name: "getbot",
      aliases: ["fetchbot"],
      group: "util",
      memberName: "getbot",
      description: "Fetch a bot on DBL or Listcord.",
      guildOnly: false,
      args: [{
        key: "idi",
        type: 'user',
        prompt: "Mention or enter the id of the bot."
      }, {
        key: 'list',
        type: 'string',
        default: '',
        prompt: 'Enter the list that you want search. (DBL or ListCord)'
      }]
    });
  }
  async run (msg, { idi, list }) {
    var id = idi.id
    var embed = new RichEmbed ()
    embed.setColor(0xFF00F0)
    msg.client.dbl.getBot(id).then(dblbot => {
      snek.get("https://listcord.com/api/bot/"+ id).then((bot) => {
        if (dblbot.username && bot.body.username && !list) return msg.channel.send("I found this bot on DBL and Listcord, so...\nUse `k.getbot "+ id +" listcord` to get ListCord profile...\nOr `dbl` to get dbl profile.");
     
        if (!dblbot || list === "listcord") {
          embed.setTitle(bot.body.username +" profile on Listcord")
          embed.setDescription(bot.body.description)
          embed.addField("Guilds", bot.body.servers)
          embed.addField("Invites", bot.body.invites)
          return msg.channel.send(embed)
        }
        if (!bot || list === "dbl") {
          embed.setTitle(dblbot.username +" profile on DBL")
          embed.setDescription(dblbot.shortdesc)
          embed.addField("Libary", dblbot.lib)
          embed.addField("Prefix", dblbot.prefix)
          embed.addField("Tags", dblbot.tags.join(', '))
         return msg.channel.send(embed)
        }
      });
    });
  }
}

module.exports = BotCommand