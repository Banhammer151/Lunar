const { hug } = '../responses';

exports.run = async (client, message) => {
	const keys = Object.keys(hug);
	const randIndex = Math.floor(Math.random() * keys.length);
	const randKey = keys[randIndex];
	const name = hug[randKey];
	if(!message.mentions.users.first()) {
		const user = 'themselves';
		await message.channel.send(`${name.text} ${user.toString()}`, { files:[name.img] });
	}
	else{
		const user = message.mentions.users.first();
		await message.channel.send(`${name.text} ${user.toString()}`, { files:[name.img] });
	}
};
exports.help = {
	name: 'hug',
	category: 'roleplaying',
	description: 'give another member a hug',
	usage: 'hug @mention',
};