const { Command } = require('discord.js-commando');

class SoftbanCommand extends Command {
  constructor (client) {
    super (client, {
      name: "softban",
      group: "moderation",
      memberName: "softban",
      description: "Softban someone",
      clientPermissions: ['BAN_MEMBERS'],
      userPermissions: ['BAN_MEMBERS'],
      examples: ['softban @Daddy Daddy don\'t gived me a computer', 'softban MrPowerGamerBR', 'softban @YourMommy get off mommy'],
      guildOnly: true,
      args: [{
        key: 'user',
        prompt: "Please enter who I should softban!",
        type: 'member'
      }, {
        key: 'reason',
        type: 'string',
        prompt: "Why do you want softban him?",
        default: 'No reason provided'
      }]
    });
  }
  async run (msg, { user, reason }) {
    msg.channel.send("⚠️ You are about to softban `"+ user.user.tag +"` of your server! If you really want softban, react this message with ✅, or ❌ to cancel.").then(message => {
      message.react("✅");
      message.react("❌");
      var collector = message.createReactionCollector((r, u) => (r.emoji.name == "❌" || r.emoji.name == "✅") && u.id == msg.author.id);
      collector.on('collect', r => {
       if (r.emoji.name == "✅") {
         try {
           user.user.send("You got softbanned from "+ msg.guild.name +"!\n**Reason:** `"+ reason +"`");
         } catch(a) {}
         user.ban("Softbanned by "+ msg.author.tag +" | "+ reason);
         msg.guild.unban(user.id)
         msg.channel.send(user.user.tag +" got softbanned for `"+ reason +"` by `"+ msg.author.tag +"`!");
         collector.stop();
       } else if (r.emoji.name == "❌") {
         msg.channel.send("Ok! Canceled.");
         collector.stop();
       }
      });
    });
  }
}

module.exports = SoftbanCommand;