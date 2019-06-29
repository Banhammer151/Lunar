const { Command } = require("discord.js-commando");

class welcomemessagecommand extends Command {
  constructor(client) {
    super (client, {
      name: "welcomemessage",
      group: "moderation",
      memberName: "welcomemessage",
      throttling: {
        usages: 2,
        duration: 5
      },
      userPermissions: ["MANAGE_GUILD"],
      description: "Enable or disable my Welcome Message",
      examples: ["welcomemessage channel"],
      guildOnly: true,
      args: [{
        key: "channel",
        prompt: "Please enter the channel to enable/disable the Welcome Message.",
        type: "channel"
      }]
    });
  }
  async run(msg, { channel }) {
    var guildConf = await msg.client.db.getGuild(msg.guild.id);
    if (guildConf.welcomeMsgEn) {
      guildConf.welcomeMsgEn = false;
      msg.channel.send("Ok! Welcome Message disabled.");
    } else {
      guildConf.welcomeMsgChannel = channel.id;
      guildConf.welcomeMsgEn = true;
      msg.channel.send("Ok! Welcome Message enabled.");
    }
    msg.client.db.writeGuild(msg.guild.id, guildConf);
  }
}

module.exports = welcomemessagecommand;