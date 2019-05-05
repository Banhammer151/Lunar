const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js')
const npmApi = require('npm-api-util');

class NPMCommand extends Command {
  constructor (client) {
    super (client, {
      name: "npm",
      aliases: ["npmpackage"],
      group: "util",
      memberName: "npm",
      description: "Search a package on Node Package Manager",
      examples: ['npm eris'], 
      guildOnly: false,
      args: [{
        key: 'text',
        label: 'text',
        prompt: "Please enter what you wanna search!",
        type: "string"
      }]
    });
  }
  async run (msg, { text }) {
    npmApi.packageInfo(text, function (e, i) {
      if (e) return msg.channel.send("Package not found!");
      let mantedores = ""
      for(var x = 0; x < i.packageMaintainers.length; x++) {
        mantedores = mantedores +", "+ i.packageMaintainers[x].name
      }
      var embed = new RichEmbed()
      .setTitle(i.packageName)
      .setDescription(i.packageDescription)
      .addField("Last version: `"+ i.packageLatestDistTag +"`", "Maintainers: `"+ mantedores.replace(",", "") +"`")
      .setAuthor(i.packageAuthor.name +" ("+ i.packageAuthor.email +")")
      .setColor(0xFF0000)
      .setFooter("NPM", "https://cdn.discordapp.com/attachments/446298803566542869/466379082570137612/download_1.png")
      .setURL("https://npmjs.com/package/"+ text)
      .setImage(`https://nodei.co/npm/${text}.png?downloads=true&downloadRank=true&stars=true`)
      msg.channel.send(embed)
    });
  }
}

module.exports = NPMCommand;
