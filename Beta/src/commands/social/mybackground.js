const { Command } = require("discord.js-commando");
//var Discord = require("discord.js");

class BackGroundCommand extends Command {
  constructor(client) {
    super (client, {
      name: "mybackground",
      aliases: ["background"],
      group: "social",
      memberName: "background",
      description: "Change your profile text!",
      examples: ["aboutme Wake up the members of my nation"],
      guildOnly: false,
      args: [{ key: "about", type: "string", prompt: "Enter the text" }]
    });
  }
  async run(msg, { about }) {
    var userConf = await msg.client.db.getUser(msg.author.id);
    userConf.background = about;
    msg.channel.send("Okay! Your new personal background is `"+ about +"`!");
    msg.client.db.writeUser(msg.author.id, userConf);
  }
}

module.exports = BackGroundCommand;