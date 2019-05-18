/* eslint-disable linebreak-style */
const { Command } = require("discord.js-commando");

class IamAddCommand extends Command {
  constructor(client) {
    super (client, {
      name: "addiam",
      group: "social",
      clientPermissions: ["MANAGE_ROLES"],
      userPermissions: ["MANAGE_GUILD"],
      memberName: "addiam",
      description: "Add a role to iam.",
      examples: ["addiam Role"],
      guildOnly: true,      
      args: [{
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
    roles.iam.push(obj);
    msg.channel.send(`Added the role ${role.name} to the public roles`);
    msg.client.db.writeGuild(msg.guild.id, roles);
  }
}

module.exports = IamAddCommand;