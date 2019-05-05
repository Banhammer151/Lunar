const { Command } = require('discord.js-commando');

class EmojiCommand extends Command {
  constructor (client) {
    super (client, {
      name: "addemoji",
      aliases: ["emojiadd"],
      group: "util",
      clientPermissions: ["MANAGE_EMOJIS"],
      userPermissions: ["MANAGE_EMOJIS"],
      memberName: "addemoji",
      description: "Add a emoji to your guild - you will love this command if you are lazy.",
      examples: ['addemoji http://owo.com/awa.jpg', 'addemoji <add a image>'],
      guildOnly: true,
      args: [{
        key: 'text',
        label: 'text',
        prompt: "Please enter the emoji name!",
        type: "string"
      }, {
        key: 'link',
        default: '',
        prompt: "Enter the image link!",
        type: "string"
      }]
    });
  }
  async run (msg, { text, link }) {
    if (!msg.attachments.first() && !link) return msg.channel.send("Hey! You should enter the image link or attach a image to the message! Try again.")
    link = msg.attachments.first() ? msg.attachments.first().url : link;
    if (link.endsWith('.jpg') || link.endsWith('.gif') || link.endsWith('.jpeg') || link.endsWith('.png')) {
   //   msg.channel.send("You should enter a valid image!")
      msg.guild.createEmoji(link, text).then((emoji) => {
        var hm
        if (emoji.animated) hm = "<a:"+ emoji.name +":"+ emoji.id +">"
        else hm = "<:"+ emoji.name +":"+ emoji.id +">"
        msg.channel.send(hm +" | Success!")
      })
    } else {
      msg.channel.send("You should enter a valid image!")
    }
  }
}

module.exports = EmojiCommand;