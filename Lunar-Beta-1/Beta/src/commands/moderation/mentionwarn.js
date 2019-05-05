const { Command } = require('discord.js-commando');

class MentionWarnCommand extends Command {
  constructor (client) {
    super (client, {
      name: "mentionwarn",
      aliases: ["warnmention"],
      group: "moderation",
      memberName: "mentionwarn",
      throttling: {
        usages: 2,
        duration: 5
      },
      description: "Wanna know who mention you and deleted it? Use this function.",
      examples: ['mentionwarn true', 'mentionwarn false'],
      guildOnly: false,
      args: [{
        key: 'text',
        label: 'text',
        prompt: "Please enter what you want do. (Use `true` to enable, `false` to disable.",
        type: "string"
      }]
    });
  }
  async run (msg, args) {
    var phase = args.text;
    if (phase != 'false' && phase != 'true') return msg.channel.send("You can only use `true` or `false`")
    var user = await msg.client.db.getUser(msg.author.id)
    if (phase == 'true') phase = true
    else phase = false
    user.mentionWarn = phase
    await msg.client.db.writeUser(msg.author.id, user)
    if (phase == true) msg.channel.send("<:tickYes:315009125694177281> Okay!")
    else msg.channel.send("<:tickNo:315009174163685377> Okay!");
  }
}

module.exports = MentionWarnCommand;