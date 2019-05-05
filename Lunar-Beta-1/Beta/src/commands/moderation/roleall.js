const { Command } = require('discord.js-commando');
var snek = require('snekfetch')
class RoleAllCommand extends Command {
  constructor (client) {
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
      examples: ['roleall Members', 'roleall 12866292622862'],
      guildOnly: true,
      args: [{
        key: 'role',
        prompt: "Please enter the role to give to all members!",
        type: "role"
      }]
    });
  }
  async run (msg, { role }) {
    snek.get("https://listcord.com/api/bot/"+ msg.client.user.id +"/votes").then(async egito => {
      function checkVote(arr) {
        var meDeUmNome = arr.length - 1
        return new Promise(async function (res, rej) {
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].id == msg.author.id)res(true)
            if (i == meDeUmNome) res(false)
          }
        });
      }
      var voted = await checkVote(egito.body)
      if(!voted) return msg.channel.send('Hey! In order to use this command, please upvote me on Listcord! <:listcord:462350611854262282>\nhttps://listcord.com/bot/461552010240589824');
  
      var kanoriRole = msg.guild.members.get(msg.client.user.id).highestRole
      if (role.position >= kanoriRole.position) return msg.channel.send("I can't apply that role: This role is higher than mine or equal! Please give me a role better than the role that you want apply.");
      var now = Date.now()
      var z = 0
      msg.channel.send("Ok, adding the role `"+ role.name +"` to "+ msg.guild.members.size +" members. Please be patient! This can take up 10 minutes.");
      msg.guild.members.forEach(member => {
        member.addRole(role, ["Roleall Command - Author: "+ msg.author.id]);
        z++
        if (z == msg.guild.members.size) {
          var agora = Date.now()
          var tookTime = agora - now
          msg.channel.send("Finished! Added `"+ role.name +"` to all members on "+ (tookTime / 1000).toFixed(4) +" seconds!");
       }
      });
    });
  }
}

module.exports = RoleAllCommand;