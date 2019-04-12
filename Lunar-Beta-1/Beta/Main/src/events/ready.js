module.exports = (client, guild) => {
	client.user.setPresence({ activity: { name: '!|Working On Beta!' }, status: 'idle' })
		.then(console.log('Ready!'))
		.catch(console.error);
};
