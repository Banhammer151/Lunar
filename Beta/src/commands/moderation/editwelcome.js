const { Command } = require("discord.js-commando");

class editwelcomecommand extends Command {
  constructor(client) {
    super (client, {
      name: "editwelcome",
      group: "moderation",
      memberName: "editwelcome",
      throttling: {
        usages: 2,
        duration: 5
      },
      userPermissions: ["MANAGE_GUILD"],
      description: "edit your welcome message",
      examples: ["editweclome text"],
      guildOnly: true,
      args: [
        {
          key: "text",
          prompt: "What text would you like your welcome message to be? if you don't want to ping the member user {{user}} to ping the member use {{pingthem}} ",
          type: "string",
        },
      ],
    });
  }
  async run(msg, { text }) {
    var guildConf = await msg.client.db.getGuild(msg.guild.id);
   
    guildConf.welcomeMsg = text;
    
    msg.channel.send("Ok! Welcome Message edited!.");
    
    msg.client.db.writeGuild(msg.guild.id, guildConf);
  }
}

module.exports = editwelcomecommand;