const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

class GiveawayCommand extends Command {
  constructor (client) {
    super (client, {
      name: "giveaway",
      group: "fun",
      memberName: "giveaway",
      description: "Make a giveaway",
      guildOnly: true,
      args: [
      {
        key: "time",
        prompt: "When this giveaway will be over? Type the time in minutes",
        type: "string"
      },
      {
        key: "emoji",
        prompt: "Type the emoji to users react!",
        type: 'string'
      },
      {
        key: "sorting",
        prompt: "What you are trying to sort?",
        type: "string"
      }]
    });
  }
  async run (msg, { time, emoji, sorting }) {
    var img = msg.attachments.first()
    var lock = false;
    if (!msg.attachments.first() || msg.attachments.size <= 0) {
      img = false
    } else {
      if (!img.url.endsWith(".jpg") || !img.url.endsWith(".png") || !img.url.endsWith(".gif")) img = false;
      img = img.url
      lock = true
    }
    var timea = time * 1000 * 60
    var emojia = msg.client.emojis.find("name", emoji.replace("<", "").replace(":", "").split(":")[0])
    if (emojia.animated && emojia.name) {
      emoji = "<a:"+ emojia.name +":"+ emojia.id +">"; 
    } else if (!emoji.animated && emojia.name) { 
      emoji = "<:"+ emojia.name +":"+ emojia.id +">"; 
    } else if (!emoji && !emojia.name) {
      emoji = ":"+ emoji +":"
    }
    var embed = new RichEmbed()
    embed.setDescription(msg.author.username +" is giving away "+ sorting +".\n**React this message with "+ emoji +" to join! This giveaway ends in "+ time +" minutes!**")
    embed.setColor(0xFF0090)
    if (lock) embed.setImage(img)
    embed.setAuthor(msg.author.username, msg.author.avatarURL)
    msg.channel.send(embed).then(g => {
      g.react(emoji.replace("<", "").replace(":", "").split(":")[1].replace(">", ""))
      var collector = g.createReactionCollector((r, u) => (r.emoji.name === emoji.replace("<", "").replace(":", "").split(":")[0]) && u.id !== msg.client.user.id);
      collector.on('end', r => {
        if (!r.first()) {
          embed.setDescription("Idiots! No one joined the giveaway of "+ sorting +".")
          embed.setColor(0xFF0000)
          if (lock) embed.setImage(img)
          embed.setAuthor(msg.author.username, msg.author.avatarURL)
          g.clearReactions()
          return g.edit(embed);
        }
        var user = r.first().users.filter(user => !user.bot).random();
        embed.setDescription("End! "+ user.username +" won "+ sorting +'.');
        embed.setColor(0x00000)
        if (lock) embed.setImage(img)
        embed.setAuthor(msg.author.username, msg.author.avatarURL)
        g.clearReactions()
        g.edit(`<@${user.id}>`, embed);
        msg.channel.send(":tada: | Hey <@"+ user.id +">, you won `"+ sorting +"`!");
      });
      setTimeout(() => {
        collector.stop();
      }, timea);
     });
   }
}

module.exports = GiveawayCommand;