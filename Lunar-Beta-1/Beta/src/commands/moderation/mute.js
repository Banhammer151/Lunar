var { Command } = require('discord.js-commando');

class MuteCommand extends Command {
  constructor (client) {
    super (client, {
      name: 'mute',
      group: 'moderation',
      memberName: "mute",
      guildOnly: true,
      clientPermissions: ["MANAGE_ROLES"],
      userPermissions: ["MANAGE_ROLES"],
      description: 'Mute someone from your server!',
      args: [{
        key: 'user',
        prompt: "Please type who you want mute!",
        type: "member"
      },
      {
        key: 'time',
        prompt: "Please type the time to this user get unmuted!",
        type: "string"
      },
      {
        key: 'reason',
        prompt: 'Please type why you want ban this user!',
        default: 'Reason not provided',
        type: "string"
      }]
    });
  }
  async run (msg, { user, time, reason }) {
    msg.channel.send("⚠️ You are about to mute `"+ user.user.tag +"` by "+ time +" minutes of your server! If you really want mute this user, react this message with ✅, or ❌ to cancel.").then(message => {
      message.react("✅");
      message.react("❌");
      var collector = message.createReactionCollector((r, u) => (r.emoji.name === "❌" || r.emoji.name === "✅") && u.id == msg.author.id);
      collector.on('collect', (r) => {
        if (r.emoji.name === "✅") {
          try {
            user.user.send("You got muted from "+ msg.guild.name +"!\n**Reason:** `"+ reason +"`\n**Time:** "+ time +" minute\(s\)");
          } catch(a) {}
          var muteRole = message.guild.roles.find("name", "Kanori Muted");
          if (!muteRole) {
            message.guild.createRole({
              name: "Kanori Muted",
              permissions: []
            }).then(async (role) => {
              muteRole = role;
              await message.guild.channels.forEach(async (channel) => {
                await channel.overwritePermissions(role, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false
                });
              });
            });
          }
          message.delete();
          try {
            user.addRole(muteRole, ["Muted by "+ msg.author.tag +" | "+ reason]);
            msg.channel.send(user.user.tag +" got muted for `"+ reason +"` by `"+ msg.author.tag +"`!");
            time = parseInt(time) * 1000 * 60;
            setTimeout(() => {
              user.removeRole(muteRole, ["Auto-unmute"]);
            }, time);
            collector.stop();
          } catch (e) { msg.channel.send("🙅 Sorry, i can't mute that user! Probably "+ user.user.username +" have a higher role than mine..."); collector.stop(); }
        } else if (r.emoji.name === "❌") {
          message.delete();
          msg.channel.send("Ok! Canceled.");
          collector.stop();
        }
      });
    });
  }
}
module.exports = MuteCommand;