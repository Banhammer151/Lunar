const { Command } = require('discord.js-commando');

module.exports = class ReloadCommandCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reloadkanori',
			aliases: ['reloadk'],
			group: 'commands',
			memberName: 'reloadkanori',
			description: 'Kanori master-switch - Reload shards, website, canvas systems, dbl posting system. Everything.',
			details: "The argument must be the name/ID (partial or whole) of a command or command group.\nProviding a command group will reload all of the commands in that group.\nOnly the bot owner(s) may use this command.",
			examples: ['reload some-command'],
			ownerOnly: true,
			guarded: true,

			args: [
				{
					key: 'cmdOrGrp',
					label: 'command/group',
					prompt: 'Which command or group would you like to reload? You can use kanori to kill all shards and reload kanori client or CanvasCommand to reload CanvasCommand instance',
					type: 'string'
				}
			]
		});
	}

	async run(msg, args) {
		const { cmdOrGrp } = args;
    if (cmdOrGrp == "kanori") {
      msg.channel.send("Killing all shards and restarting Kanori...")
     setTimeout(() => { process.exit() }, 2500)
    }
    if (cmdOrGrp == "canvascommand") {
      msg.channel.send("Reloading CanvasCommand instance...")
      delete require.cache[require.resolve('../../util/CanvasCommand')]
      require('../../util/CanvasCommand').loadResources()
      return  msg.channel.send("CanvasCommand instance reloaded. Loading buffers...")
    }
	}
}