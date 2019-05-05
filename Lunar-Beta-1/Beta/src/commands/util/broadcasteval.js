const { Command } = require('discord.js-commando');
class BEvalCommand extends Command {
  constructor (client) {
    super (client, {
      name: "broadcasteval",
      aliases: ["beval", "shardeval"],
      group: "util",
      memberName: "broadcasteval",
      description: "Run a code on all shards",
      guildOnly: false,
      args: [{
        key: 'op',
        prompt: "Please enter your code master!",
        type: "string"
      }]
    });
  }
  async run (msg, args) {
    if (msg.author.id !== "201710904612618240") return msg.channel.send("Only my owner can use this command.");
    var { RichEmbed } = require('discord.js');
    var code = args.op;
    var data = Date.now()
    try {
      function getGuild (id) {
        msg.client.shard.broadcastEval('this.guilds.get("'+ id +'")').then(r => {
          for (var i = 0; i < r.length; i++) {
            if (r[i] != null) {
              return r[i]
            }
          }
        });
      }
      // getGuild('id')
      if (code == "getGuild") {
        var id = code.split("(").replace("'", "").replace("'", "").replace(")", "")
      }
      msg.client.shard.broadcastEval(getGuild+"\n"+ code).then(async r => {
        var sla = r
        for (var i = 0; i < r.length; i++) {
          if (r[i].length > 2000) {
            console.log(r[i])
            r[i] = "Output has 2000 or more chars. You can check the output on console."
          }
        }
        var embed = new RichEmbed()
        .setTitle("📡 Results")
        .setDescription("Task complete: Took "+ parseInt(Date.now() - data) +"ms to complete.")
        .setColor(0x0F00FF)
        .addField("Shard 1", "```"+ sla[0] +"```")
        .addField("Shard 2", "```"+ sla[1] +"```")
        return msg.channel.send(embed);
      });
    } catch (e) {
      console.log(e)
      msg.channel.send("😣 The shards are unavaliable now! Try again later. (Or another kind of error happen, check your console!)");
    }
  }
}

module.exports = BEvalCommand;