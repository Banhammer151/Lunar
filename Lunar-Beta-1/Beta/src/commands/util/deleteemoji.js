const { Command } = require('discord.js-commando');

class EmojiCommand extends Command {
  constructor (client) {
    super (client, {
      name: "deleteemoji",
      aliases: ["emojidelete"],
      group: "util",
      clientPermissions: ["MANAGE_EMOJIS"],
      userPermissions: ["MANAGE_EMOJIS"],
      memberName: "deleteemoji",
      description: "Delete a emoji from your guild - you will love this command if you are lazy.",
      examples: ['deleteemoji :owo:', 'deleteemoji hmm'],
      guildOnly: true,
      args: [{
        key: 'emoji',
        label: 'text',
        prompt: "Please enter the emoji to delete?",
        type: "string"
      }]
    });
  }
  async run (msg, { emoji }) {
    msg.guild.deleteEmoji(emoji).then(() => {
      msg.channel.send('Bye emoji! | Success.')
    });
  }
}

module.exports = EmojiCommand;