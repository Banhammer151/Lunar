const { Command } = require('discord.js-commando');

Array.prototype.findItem = function (str) {
  var target = this
  if (!target.includes(str)) return undefined
  for (var i = 0; i < target.length; i++) {
    if (target[i] == str) return i
  }
};

class BWFCommand extends Command {
  constructor (client) {
    super (client, {
      name: "bwf",
      aliases: ["badwordfilter"],
      userPermissions: ["MANAGE_GUILD"],
      clientPermissions: ["MANAGE_MESSAGES"],
      group: "moderation",
      memberName: "bwf",
      description: "Block some word on your server",
      examples: ['bwf shit', 'bwf fuck'],
      guildOnly: true,
      args: [{
        key: 'text',
        label: 'text',
        prompt: "Please enter the word to block!",
        type: "string"
      }]
    });
  }
  async run (msg, { text }) {
    text = text.toLowerCase()
    var guildConf = await msg.client.db.getGuild(msg.guild.id)
    if (text == "list") {
      var arr = guildConf.bwf
      if (!arr[0]) return msg.channel.send("No words banned on this guild.");
      msg.channel.send("Words banned on `"+ msg.guild.name +"`\n```"+ arr.join(', ') +"```");
    } else if (guildConf.bwf.includes(text)) {
      var index = guildConf.bwf.findItem(text)
      guildConf.bwf = guildConf.bwf.splice(0, index)
      msg.channel.send("<:tickNo:315009174163685377> Success! This word is now allowed.");
      msg.client.db.writeGuild(msg.guild.id, guildConf)
    } else {
      guildConf.bwf.push(text)
      msg.channel.send("<:tickYes:315009125694177281> Now this word is blocked on this server!")
      msg.client.db.writeGuild(msg.guild.id, guildConf)
    }
  }
}

module.exports = BWFCommand;