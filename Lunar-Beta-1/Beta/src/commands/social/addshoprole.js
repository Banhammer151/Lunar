/* eslint-disable linebreak-style */
const { Command } = require("discord.js-commando");

class DailyCommand extends Command {
  constructor(client) {
    super (client, {
      name: "addshoprole",
      group: "social",
      clientPermissions: ["MANAGE_ROLES"],
      userPermissions: ["MANAGE_GUILD"],
      memberName: "addshoprole",
      description: "Add a role to Lunar Shop.",
      examples: ["addshoprole Price Role"],
      guildOnly: true,      
      args: [{
        key: "price",
        type: "integer",
        prompt: "Enter the price of the role."
      }, {
        key: "role",
        type: "role",
        prompt: "Enter the role to sell."
      }]
    });
  }
  async run(msg, { price, role }) {
    var roles = await msg.client.db.getGuild(msg.guild.id);
    var usr = await msg.client.db.getUser(msg.author.id);
    
    
    msg.client.db.writeUser(msg.author.id, usr);
    var obj = {
      role: role.id,
      price: price
    };
    roles.shop.push(obj);
    msg.channel.send("Added the role "+ role.name +" for "+ price +" coins.");
    msg.client.db.writeGuild(msg.guild.id, roles);
  }
}

module.exports = DailyCommand;