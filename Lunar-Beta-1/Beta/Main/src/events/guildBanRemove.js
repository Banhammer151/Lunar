module.exports = async (guild, user, client) => {


	const logs = guild.channels.find(channel => channel.name === 'lunar-logs');
	if (guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		guild.channels.create('lunar-logs', 'text');
	}
	if (!guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions');
	}

	guild.channels.find(channel => channel.name === 'lunar-logs').send(`**[Unbanned]**  + ${user}`);
};

