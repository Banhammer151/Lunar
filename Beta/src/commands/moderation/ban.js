const { Command } = require('discord.js-commando');

class BanCommand extends Command {
  constructor (client) {
    super (client, {
      name: "ban",
      group: "moderation",
      memberName: "ban",
      description: "Ban someone",
      clientPermissions: ['BAN_MEMBERS'],
      userPermissions: ['BAN_MEMBERS'],
      examples: ['ban @Daddy Daddy don\'t gived me a computer', 'ban MrPowerGamerBR', 'ban @YourMommy get off mommy'],
      guildOnly: true,
      args: [{
        key: 'user',
        prompt: "Please enter who i should ban!",
        type: 'member'
      }, {
        key: 'reason',
        type: 'string',
        prompt: "Why do you want ban him?",
        default: 'No reason provided'
      }]
    });
  }
  async run (msg, { user, reason }) {
    msg.channel.send("⚠️ You are about to ban `"+ user.user.tag +"` of your server! If you really want ban, react this message with ✅, or ❌ to cancel.").then(message => {
      message.react("✅");
      message.react("❌");
      var collector = message.createReactionCollector((r, u) => (r.emoji.name === "❌" || r.emoji.name === "✅") && u.id == msg.author.id);
      collector.on('collect', (r) => {
       if (r.emoji.name == "✅") {
         try {
           user.user.send("You got banned from "+ msg.guild.name +"!\n**Reason:** `"+ reason +"`");
         } catch(a) {}
         user.ban("Banned by "+ msg.author.tag +" | "+ reason);
         msg.channel.send(user.user.tag +" got banned for `"+ reason +"` by `"+ msg.author.tag +"`!");
         collector.stop();
       } else if (r.emoji.name === "❌") {
         msg.channel.send("Ok! Canceled.");
         collector.stop();
       }
      });
    });
  }
}

module.exports = BanCommand;