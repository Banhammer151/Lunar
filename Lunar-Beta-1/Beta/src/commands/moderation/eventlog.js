const { Command } = require('discord.js-commando');

class EventLogCommand extends Command {
  constructor (client) {
    super (client, {
      name: "eventlog",
      group: "moderation",
      memberName: "eventlog",
      throttling: {
        usages: 2,
        duration: 5
      },
      userPermissions: ['MANAGE_GUILD'],
      description: "Enable or disable my eventlog",
      examples: ['eventlog channel'],
      guildOnly: true,
      args: [{
        key: 'channel',
        prompt: "Please enter the channel to enable/disable the event-log.",
        type: "channel"
      }]
    });
  }
  async run (msg, { channel }) {
    var guildConf = await msg.client.db.getGuild(msg.guild.id)
    if (guildConf.eventLog) {
      guildConf.eventLog = false
      msg.channel.send("Ok! Event-log disabled.")
    } else {
      guildConf.eventLogChannel = channel.id
      guildConf.eventLog = true
      msg.channel.send("Ok! Event-log enabled.");
    }
    msg.client.db.writeGuild(msg.guild.id, guildConf)
  }
}

module.exports = EventLogCommand;