const { Command } = require('discord.js-commando');
var Discord = require('discord.js')

class DailyCommand extends Command {
  constructor (client) {
    super (client, {
      name: "daily",
      group: "social",
      memberName: "daily",
      description: "Get your daily coins!",
      examples: ['daily'],
      guildOnly: false,
    });
  }
  async run (msg) {
    var date = new Date()
    var day = date.getUTCDate();
    var id = msg.author.id
    var userConf = await msg.client.db.getUser(id)
    var rint = Math.floor(Math.random(2000 * 2000) * 9500)
    if (userConf.nextMoney == day) return msg.channel.send(":atm: | You already got your daily coins today!\nCome back tomorrow.");
    msg.channel.send(":atm: | Ok! To confirm, please type `"+ rint +"`. You have 30 seconds, gotta go fast!").then(awa => {
      const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 30000 });
      collector.on('collect', msge => {
        if (msge.content != rint) return msg.channel.send(":x: | Wrong number! Run this command again.");
        userConf.money += parseInt(100)
        userConf.nextMoney = day
        msg.channel.send(":atm: | Yay! You got your 100 daily coins. Come back tomorrow!");
        msg.client.db.writeUser(id, userConf)
        collector.stop()
      });
    });
  }
}

module.exports = DailyCommand;