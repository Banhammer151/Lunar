const { Command } = require('discord.js-commando');
let exec = require("child_process").exec;

class ExecCommand extends Command {
  constructor (client) {
    super (client, {
      name: "exec",
      aliases: ["bash"],
      group: "commands",
      memberName: "exec",
      description: "Run something on terminal",
      guildOnly: false,
      args: [{
        key: 'text',
        label: 'text',
        prompt: "NO COMMAND! Enter the command to run",
        type: "string"
      }]
    });
  }
  async run (msg, { text }) {
    if (msg.author.id != "201710904612618240") return;
    var message = await msg.channel.send("Running... Keep calm and wait.");
    exec(text, (error, stdout, stderr) => {
      if (error || stderr) {
        if (stderr.length > 1980) return console.log(stderr), message.edit("Error! The error message is too big, so check your console.");
        message.edit("Error!\n```"+ stderr +"```")
      } else {
        if (stdout.length > 1980) return console.log(stdout), message.edit("Success! The result is too big, so check your console.");
        message.edit("Success!\n```"+ stdout +"```");
      }
    });
  }
}

module.exports = ExecCommand;