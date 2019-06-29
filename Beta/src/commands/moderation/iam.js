/* eslint-disable linebreak-style */
const { Command } = require("discord.js-commando");

class IamCommand extends Command {
  constructor(client) {
    super (client, {
      name: "iam",
      group: "moderation",
      memberName: "iam",
      description: "Buy a role with Lunar coins.",
      examples: ["buyrole <role>"],
      guildOnly: true,
      args: [{
        key: "roleA",
        type: "role",
        prompt: "Enter the role to add!"
      }]
    });
  }
  async run(msg, { roleA }) {
    var roles = await msg.client.db.getGuild(msg.guild.id);
    var owner = await msg.client.db.getUser(msg.guild.owner.user.id);
    var usrInfo = await msg.client.db.getUser(msg.author.id);
    var t = 0;
    roles.iam.forEach(role => {
      if (msg.guild.roles.get(role.role).name == roleA.name) {
        //if (usrInfo.money < role.price) return msg.channel.send("Sorry, you don't have enough money to buy this role! Use `@Lunar balance "+ msg.author.username +"` to see your balance!");
        var roleG = msg.guild.roles.get(role.role);
        // usrInfo.money -= parseInt(role.price);
        // var ata = role.price / 50;                        
        // owner.money += parseInt(ata);
        msg.client.db.writeUser(msg.guild.owner.id, owner);
        msg.client.db.writeUser(msg.author.id, usrInfo);
        msg.member.addRole(roleG);
        return msg.channel.send(`You added the role ${roleG.name} to yourself`);
      }
      if (roles.shop.length == t) return msg.channel.send("I didn't find this role! Use `@Lunar iamroles` for a list of avaliable roles.");
      t++;
    });
  }
}

module.exports = IamCommand;