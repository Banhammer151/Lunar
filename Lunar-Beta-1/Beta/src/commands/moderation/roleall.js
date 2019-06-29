/* eslint-disable linebreak-style */
const { Command } = require("discord.js-commando");
class RoleAllCommand extends Command {
  constructor(client) {
    super (client, {
      name: "roleall",
      aliases: ["rall"],
      group: "moderation",
      userPermissions: ["MANAGE_ROLES"],
      clientPermissions: ["MANAGE_ROLES"],
      memberName: "roleall",
      throttling: {
        usages: 2,
        duration: 60
      },
      description: "Give a role to all members",
      examples: ["roleall Members", "roleall 12866292622862"],
      guildOnly: true,
      args: [{
        key: "role",
        prompt: "Please enter the role to give to all members!",
        type: "role"
      }]
    });
  }
  async run(msg, { role }) {
    const DBL = require("dblapi.js");
    const dbl = new DBL("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4MDgzODU2NjQ3MDIyMTg1NCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTU4MjgyNDkxfQ.pkZ3MMsSaJVObpD9yfqB6NO7HAa-xGJlUaAX04SGufk", msg.client);
    const voted = await dbl.hasVoted(msg.author.id).then(voted => {
      if (voted) console.log(`${msg.author.username} has voted!!!`);
    });
    //var voted = await checkVote(egito.body);
    if (!voted) return msg.channel.send("Hey! In order to use this command, please upvote me on DiscordBots.org! <:dblAdmin:483994951961673738>\nhttps://discordbots.org/bot/480838566470221854");
  
    var LunarRole = msg.guild.members.get(msg.client.user.id).highestRole;
    if (role.position >= LunarRole.position) return msg.channel.send("I can't apply that role: This role is higher than mine or equal! Please give me a role better than the role that you want apply.");
    var now = Date.now();
    var z = 0;
    msg.channel.send("Ok, adding the role `"+ role.name +"` to "+ msg.guild.members.size +" members. Please be patient! This can take up 10 minutes.");
    msg.guild.members.forEach(member => {
      member.addRole(role, ["Roleall Command - Author: "+ msg.author.id]);
      z++;
      if (z == msg.guild.members.size) {
        var agora = Date.now();
        var tookTime = agora - now;
        msg.channel.send("Finished! Added `"+ role.name +"` to all members on "+ (tookTime / 1000).toFixed(4) +" seconds!");
      }
    });
  //  });
  }
}

module.exports = RoleAllCommand;