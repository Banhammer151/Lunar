// Basic Command Template
exports.run = async (client, message, args) => {
	if (!args[0]) {
		// Load guild settings (for prefixes and eventually per-guild tweaks)


		// Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
		const myCommands = client.commands;

		// Here we have to get the command names only, and we use that array to get the longest name.
		// This make the help commands "aligned" in the output.
		const commandNames = myCommands.keyArray();
		const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

		let currentCategory = '';
		let output = '= Command List =\n\n[Use help <commandname> for details]\n';
		const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1);
		sorted.forEach(c => {
			const cat = c.help.category;
			if (currentCategory !== cat) {
				output += `\n== ${cat} ==\n`;
				currentCategory = cat;
			}
			output += `${c.help.name}${' '.repeat(longest - c.help.name.length)}:: ${c.help.description}\n`;
		});


		message.author.send(output, { code:'asciidoc', split:'true' }).then(() => console.log('Help Command Used!')).catch(console.error);
		// eslint-disable-next-line no-shadow
		message.channel.send('Help is on the way!').then(message => message.edit('Help Sent!')).catch(console.error);

	}
	else {
		// Show individual command's help.
		let command = args[0];
		if (client.commands.has(command)) {
			command = client.commands.get(command);
			message.author.send(`= ${command.help.name} = \n${command.help.description}\nusage::${command.help.usage}`, { code:'asciidoc' });
		}
	}

};


exports.help = {
	name: 'help',
	category: 'system',
	description: 'Help Command',
	usage: 'help',
};