const { stripIndents, oneLine } = require('common-tags');
const { Command } = require('discord.js-commando')
var { RichEmbed } = require('discord.js')
var z = 0


module.exports = class HelpCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'help',
			group: 'util',
			memberName: 'help',
			aliases: ['commands'],
			description: 'Displays a list of available commands, or detailed information for a specified command.',
			details: oneLine`
				The command may be part of a command name or a whole command name.
				If it isn't specified, all available commands will be listed.
			`,
			examples: ['help', 'help prefix'],
			guarded: true,

			args: [
				{
					key: 'command',
					prompt: 'Which command would you like to view the help for?',
					type: 'string',
					default: ''
				}
			]
		});
	}

	async run(msg, args) { // eslint-disable-line complexity
		if (!args.command || args.command === "") {
      var cmdArray = msg.client.registry.commands.array()
      var embed = new RichEmbed ()
      .setTitle("Kanori Help")
      .setAuthor(msg.client.user.username, msg.client.user.avatarURL)
      .setFooter("React on 📖 to see more commands or 🐱 to... just, don't react!", msg.author.avatarURL)
      .setColor("RANDOM")
      .setDescription("Heya! I'm Kanori, a kawaii bot for helping you with your server and making fun of users some times.\n**I have "+ msg.client.registry.commands.size +" commands (and counting!)**\nFor help with a command, use help commandName")
      var toShow = []
      var removedcmds = []
        while (cmdArray.length > 50) {
          var command = cmdArray.pop()

          removedcmds.push(command)
        } 
      var tamanho = cmdArray.length
      for (var v = 0; cmdArray.length > 0; v++) {
        var info1 = "dot"
        if (cmdArray[1]) info1 = cmdArray[1].name +": `"+ cmdArray[1].description +"`";
        await embed.addField(cmdArray[0].name +": `"+ cmdArray[0].description +"`", info1)
        cmdArray.shift(); cmdArray.shift();
      }
      var embedo = new RichEmbed ()
      try {
        if (!removedcmds[0]) embed.setFooter("End of help command.")
      msg.channel.send(embed).then(async (help) => {
        if (removedcmds[0]) { 
          help.react("📖")
        var collector = help.createReactionCollector((react, user) => (react.emoji.name === "📖" || react.emoji.name === "🐈") && user.id == msg.author.id)
        
        collector.on('collect', async (r) => {
          switch (r.emoji.name) {
            case '📖':
              embedo.setTitle("Kanori Help")
              embedo.setDescription("Heya! I'm Kanori, a kawaii bot for helping you with your server and making fun of users some times.\n**I have "+ msg.client.registry.commands.size+" commands. (and counting!)**");
              embedo.setColor("RANDOM")
              embedo.setAuthor(msg.client.user.username, msg.client.user.avatarURL)
              for (var i = 0; i < removedcmds.length; i++) {
                var u = parseInt(i + 1)
                var last = "End of help command."
                if (removedcmds[u]) last = removedcmds[u].name +": `"+ removedcmds[u].description +"`";
                await embedo.addField(removedcmds[i].name+": `"+ removedcmds[i].description +"`", last)
                i++
              }
              help.delete()
              msg.channel.send(embedo)
              
              break
            case '🐈':
              help.delete()
              msg.author.send("One day, a small girl just disappear from the eyes of his mom, fallin' into the nothing.\nLost.\nAlone.\nYou know who is him?\nWanna know **who** is him?\nLook behind you.");
              collector.stop()
              break
          }
        });
        
        setTimeout(() => { collector.stop() }, 60000)
        }
      });
      } catch (e) { msg.channel.send("ERR!"); }
    } else {
      var dm = msg.client.registry.commands.find('name', args.command)
      if (!dm) return msg.channel.send("Sorry, i can't found that command! The name is probably incorrect.");
      var aliases = dm.aliases
      var examples = dm.examples
      var permissions = dm.userPermissions
      if (aliases[0]) {
        aliases = aliases.join(', ')
      } else {
        aliases = "This command don't has any aliases"
      }
      if (!examples) {
        examples = "No examples found"
      } else {
        examples = examples.join(', ')
      }
      if (!permissions) {
        permissions = "Everyone can use this command without extra permissions"
      } else {
        permissions = permissions.join(', ')
      }
      var embed2 = new RichEmbed ()
      .setTitle("Help for command "+ dm.name)
      .setDescription(dm.description)
      .setColor("RANDOM")
      .addField('Category: `'+ dm.groupID +'`', '**Aliases:** `'+ aliases +'`')
      .addField('Permissions required: `'+ permissions +'`', '**Examples:** `'+ examples +'`');
      if (dm.guildOnly) embed2.setFooter("This command ("+ dm.name +") cannot be used on direct messages!")
      else embed2.setFooter("This command ("+ dm.name +") can be used on direct messages and guilds!");
      msg.channel.send(embed2)
    }
	}
}