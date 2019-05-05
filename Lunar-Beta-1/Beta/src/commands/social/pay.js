const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
class PayCommand extends Command {
  constructor (client) {
    super (client, {
      name: "pay",
      group: "social",
      memberName: "pay",
      throttling: {
        usages: 2,
        duration: 5
      },
      description: "Give money to someone",
      examples: ['pay @user ammount'],
      guildOnly: true,
      args: [{
        key: 'user',
        label: 'text',
        prompt: "Please enter the user",
        type: "user"
      }, {
        key: 'ammount',
        prompt: 'Enter the ammount to pay',
        type: 'string' 
      }]
    });
  }
  async run (msg, { user, ammount }) {
    var id = user.id
    var userConf = await msg.client.db.getUser(id)
    var notAuthor = await msg.client.db.getUser(msg.author.id)
    if (notAuthor.money < ammount) return msg.channel.send(":atm: | Sorry, you don't have enough money to do this! Check your balance using `@Kanori balance @"+ msg.author.username +"`!")
    var rint = Math.floor(Math.random(2000 * 2000) * 9500)
    if (isNaN(ammount)) return msg.channel.send("You should enter a number, stupid.")
    msg.channel.send(":atm: | Ok! To confirm, please type `"+ rint +"`. You have 30 seconds, gotta go fast!").then(awa => {
      const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 30000 });
      collector.on('collect', msge => {
        if (msge.content != rint) return msg.channel.send(":x: | Wrong number! Run this command again.");
        notAuthor.money -= parseInt(ammount)
        userConf.money += parseInt(ammount)
        msg.client.db.writeUser(msg.author.id, notAuthor)
        msg.client.db.writeUser(user.id, userConf)
        msg.channel.send("Success! Your new balance is "+ notAuthor.money +" coins.");
        collector.stop()
      });
    });
  }
}

module.exports = PayCommand;