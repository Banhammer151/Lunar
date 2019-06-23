const { Command } = require("discord.js-commando");
var Discord = require("discord.js");

class DailyCommand extends Command {
  constructor(client) {
    super (client, {
      name: "coinflip",
      group: "social",
      memberName: "coinflip",
      description: "heads or tails?",
      examples: ["coinflip h/t bet ammount"],
      guildOnly: false,
      args: [{
        key: "coin",        
        prompt: "Please enter h for heads or t for tails",
        type: "string"
      }, {
        key: "ammount",
        prompt: "Enter the ammount to bet",
        type: "string" 
      }]
    });
  }
  async run(msg, { user, ammount }) {
    
   
    var notAuthor = await msg.client.db.getUser(msg.author.id);
    if (notAuthor.money < ammount) return msg.channel.send(":atm: | Sorry, you don't have enough money to do this! Check your balance using `@Lunar balance @"+ msg.author.username +"`!");
    var rint = Math.floor(Math.random(2000 * 2000) * 9500);
    if (isNaN(ammount)) return msg.channel.send("You should enter a number, stupid.");
    msg.channel.send(":atm: | Ok! To confirm, please type `"+ rint +"`. You have 30 seconds, gotta go fast!").then(() => {
      const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 30000 });
      collector.on("collect", msge => {
        if (msge.content != rint) return msg.channel.send(":x: | Wrong number! Run this command again.");
        notAuthor.money -= parseInt(ammount);
       
        msg.client.db.writeUser(msg.author.id, notAuthor);
        
        msg.channel.send("Success! Your new balance is "+ notAuthor.money +" coins.");
        collector.stop();
      });
    });
  }
}

module.exports = DailyCommand;