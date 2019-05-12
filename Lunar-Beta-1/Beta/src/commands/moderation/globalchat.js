/* eslint-disable linebreak-style */
const { Command } = require("discord.js-commando");

class GlobalchatCommand extends Command {
  constructor(client) {
    super (client, {
      name: "globalchat",
      group: "moderation",
      memberName: "globalchat",
      throttling: {
        usages: 2,
        duration: 5
      },
      userPermissions: ["MANAGE_GUILD"],
      description: "Enable or disable my global chat",
      examples: ["global chat channel"],
      guildOnly: true,
    //   args: [{
    //     key: "channel",
    //     prompt: "Please enter the channel to enable/disable the global chat.",
    //     type: "channel"
    //   }]
    });
  }
  // eslint-disable-next-line no-unused-vars
  async run(msg, { channel }) {
    //     var guildConf = await msg.client.db.getGuild(msg.guild.id);
    //     if (guildConf.globalChat) {
    //       guildConf.globalChat = false;
    //       msg.channel.send("Ok! Global Chat disabled.");
    //     } else {
    //       guildConf.globalChatChannel = channel.id;
    //       guildConf.globalChat = true;
    //       msg.channel.send("Ok! Global Chat enabled.");
    //     }
    //     msg.client.db.writeGuild(msg.guild.id, guildConf);
    //   }
    msg.reply("Coming Soon to a Server near you!");
  }
}

module.exports = GlobalchatCommand;