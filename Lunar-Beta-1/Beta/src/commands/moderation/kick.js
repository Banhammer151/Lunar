const { Command } = require('discord.js-commando');

class KickCommand extends Command {
  constructor (client) {
    super (client, {
      name: "kick",
      group: "moderation",
      memberName: "kick",
      description: "Kick someone",
      clientPermissions: ['KICK_MEMBERS'],
      userPermissions: ['KICK_MEMBERS'],
      examples: ['kick @Daddy Daddy don\'t gived me a computer', 'kick MrPowerGamerBR', 'kick @YourMommy get off mommy'],
      guildOnly: true,
      args: [{
        key: 'user',
        prompt: "Please enter who i should kick!",
        type: 'member'
      }, {
        key: 'reason',
        type: 'string',
        prompt: "Why do you want kick him?",
        default: 'No reason provided'
      }]
    });
  }
  async run (msg, { user, reason }) {
    msg.channel.send("⚠️ You are about to kick `"+ user.user.tag +"` of your server! If you really want ban, react this message with ✅, or ❌ to cancel.").then(message => {
      message.react("✅");
      message.react("❌");
      var collector = message.createReactionCollector((r, u) => (r.emoji.name === "❌" || r.emoji.name === "✅") && u.id == msg.author.id);
      collector.on('collect', (r) => {
       if (r.emoji.name === "✅") {
         try {
           user.user.send("You got kicked from "+ msg.guild.name +"!\n**Reason:** `"+ reason +"`");
         } catch(a) {}
         message.delete();
         user.kick("Kicked by "+ msg.author.tag +" | "+ reason);
         msg.channel.send(user.user.tag +" got kicked for `"+ reason +"` by `"+ msg.author.tag +"`!");
         collector.stop();
       } else if (r.emoji.name === "❌") {
         message.delete();
         msg.channel.send("Ok! Canceled.");
         collector.stop();
       }
      });
    });
  }
}

module.exports = KickCommand;