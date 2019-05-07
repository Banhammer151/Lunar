/* eslint-disable linebreak-style */
const { Command } = require("discord.js-commando");

module.exports = class ReloadCommandCommand extends Command {
  constructor(client) {
    super(client, {
      name: "reloadlunar",
      aliases: ["reloadl"],
      group: "commands",
      memberName: "reloadlunar",
      description: "Lunar master-switch - Reload shards, website, canvas systems, dbl posting system. Everything.",
      details: "The argument must be the name/ID (partial or whole) of a command or command group.\nProviding a command group will reload all of the commands in that group.\nOnly the bot owner(s) may use this command.",
      examples: ["reload some-command"],
      ownerOnly: true,
      guarded: true,

      args: [
        {
          key: "cmdOrGrp",
          label: "command/group",
          prompt: "Which command or group would you like to reload? You can use Lunar to kill all shards and reload Lunar client or CanvasCommand to reload CanvasCommand instance",
          type: "string"
        }
      ]
    });
  }

  async run(msg, args) {
    const { cmdOrGrp } = args;
    if (cmdOrGrp == "Lunar") {
      msg.channel.send("Killing all shards and restarting Lunar...");
      setTimeout(() => { process.exit(); }, 2500);
    }
    if (cmdOrGrp == "canvascommand") {
      msg.channel.send("Reloading CanvasCommand instance...");
      delete require.cache[require.resolve("../../util/CanvasCommand")];
      require("../../util/CanvasCommand").loadResources();
      return  msg.channel.send("CanvasCommand instance reloaded. Loading buffers...");
    }
  }
};