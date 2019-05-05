const { Command } = require('discord.js-commando');
var Discord = require('discord.js')

class DailyCommand extends Command {
  constructor (client) {
    super (client, {
      name: "buyrole",
      group: "social",
      memberName: "buyrole",
      description: "Buy a role with Kanori coins.",
      examples: ['buyrole <role>'],
      guildOnly: true,
      args: [{
        key: "roleA",
        type: "role",
        prompt: "Enter the role to buy!"
      }]
    });
  }
  async run (msg, { roleA }) {
    var roles = await msg.client.db.getGuild(msg.guild.id)
    var owner = await msg.client.db.getUser(msg.guild.owner.user.id)
    var usrInfo = await msg.client.db.getUser(msg.author.id);
    var t = 0
      roles.shop.forEach(role => {
        if (msg.guild.roles.get(role.role).name == roleA.name) {
          if (usrInfo.money < role.price) return msg.channel.send("Sorry, you don't have enough money to buy this role! Use `@Kanori balance "+ msg.author.username +"` to see your balance!")
          var roleG = msg.guild.roles.get(role.role)
          usrInfo.money -= parseInt(role.price)
          var ata = role.price / 50                        
          owner.money += parseInt(ata)
          msg.client.db.writeUser(msg.guild.owner.id, owner)
          msg.client.db.writeUser(msg.author.id, usrInfo)
          msg.member.addRole(roleG)
          return msg.channel.send("You bought the role "+ roleG.name +" for "+ role.price +" coins.")
        }
        if (roles.shop.length == t) return msg.channel.send("I don't find this role! Use `@Kanori shoprole` for a list of avaliable roles.")
        t++
      });
  }
}

module.exports = DailyCommand;