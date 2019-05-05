var { Command } = require('discord.js-commando')

class ColorRoleCommand extends Command {
  constructor (client) {
    super (client, {
      name: "colorrole",
      userPermissions: ["MANAGE_ROLES"],
      clientPermissions: ["MANAGE_ROLES"],
      group: "util",
      description: "Changes a color of a role.",
      aliases: ["rolecolor"],
      examples: ["colorrole Role HEX Color"],
      memberName: "colorrole",
      args: [{
        key: 'role',
        type: 'role',
        prompt: "Enter the role to change the color."
      }, {
        key: 'color',
        type: 'string',
        prompt: 'Enter the HEX color to apply to this role. (You can use `RANDOM` to get a random color.)'
      }]
    });
  }
  async run (msg, { role, color }) {
      color = color.toUpperCase()
      role.edit({ color: color }).then(role => {
        msg.channel.send("Success! The new color of `"+ role.name +"` is "+ role.color +"!");
      });
  }
}

module.exports = ColorRoleCommand