// Basic Command Template
exports.run = async (client, message) => {
	if(message.member.guild.me.hasPermission('SEND_MESSAGES')) {
		return message.channel.send('pong!').catch(console.error);
	}
};
exports.help = {
	// Update this Section
	name: 'ping',
	category: 'fun',
	description: 'ping',
	usage: 'ping',
};