const { Command } = require('discord.js-commando');
var Discord = require('discord.js')

class DailyCommand extends Command {
  constructor (client) {
    super (client, {
      name: "roleshop",
      group: "social",
      memberName: "roleshop",
      description: "Show a list of avaliable roles to buy.",
      examples: ['roleshop'],
      aliases: ['shop', 'shoprole'],
      guildOnly: true
    });
  }
  async run (msg) {
    var roles = await msg.client.db.getGuild(msg.guild.id)
     var z = 1
     if (!roles.shop[0]) return msg.channel.send("Sorry, this guild don't use my shop system... To add a role, use `@Kanori addshoprole Price RoleName`")
     var arr = []
     roles.shop.forEach(role => {
       arr.push(z +": "+ msg.guild.roles.get(role.role).name +": "+ role.price +" coins.")
       
       z++
     });
      var embed = new Discord.RichEmbed()
      .setTitle(msg.guild.name +" shop")
      .setColor(0xFF00F0)
      .setFooter("If you want buy a role, use @Kanori buyrole RoleName")
      .setAuthor("And to add a role to shop, use @Kanori addshoprole Price RoleName")
      for (var x = 0; x < arr.length; x++) {
        embed.addField(arr[x], "___________")
      }
      msg.channel.send(embed)
  }
}

module.exports = DailyCommand;