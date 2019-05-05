const { Command } = require('discord.js-commando');
var { RichEmbed } = require('discord.js')
var { oneLine } = require('common-tags')

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'util',
			memberName: "ping",
			description: 'Checks the bot\'s ping to the Discord server.',
			throttling: {
				usages: 5,
				duration: 10
			},
      args: [{
        key: "type",
        prompt: "Do you want see shard info or you server?",
        default: "g",
        type: "string"
      }]
		});
	}

	async run(msg, { type }) {
    if (type == "shards") {
      msg.client.shard.broadcastEval("this.ping").then(r => {
      msg.client.shard.broadcastEval("this.guilds.size").then(rr => {
      msg.client.shard.broadcastEval("this.shard.id").then(rrr => {
      msg.client.shard.broadcastEval("this.users.size").then(rrrr => {
        var string = []
        for (var i = 0; i < r.length; i++) {
          string.push("Shard "+ parseInt(parseInt(rrr[i])) +": "+ Math.round(r[i]) +"ms, "+ rr[i] +" guilds, "+ rrrr[i] +" users.")
        }
        return msg.channel.send("```"+ string.join("\n") +"```")
      });
      });
      });
      });
    } else {
      msg.channel.send("<:PingPongOreo:465557434728185876> | **Pong!** `"+ Math.round(msg.client.ping) +"`ms (Shard **"+ parseInt(parseInt(msg.client.shard.id) + parseInt(1)) +"**/"+ process.env.SHARDCOUNT+")");
    }
  }
}