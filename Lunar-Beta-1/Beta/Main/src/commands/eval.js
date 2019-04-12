// Basic Command Template

exports.run = async (client, message, args) => {
	const clean = text => {
		if (typeof (text) === 'string') {return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));}
		else {return text;}
	};
	if(message.author.id !== '142250706307514368') return;
	try {
		const code = args.join(' ');
		let evaled = eval(code);

		if (typeof evaled !== 'string') {evaled = require('util').inspect(evaled);}

		message.channel.send(clean(evaled), { code:'xl' });
	}
	catch (err) {
		message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
	}
};
exports.help = {
	// Update this Section
	name: 'eval',
	category: 'Bot Owner',
	description: 'For Testing Purpose',
	usage: 'There is no Usage',
};