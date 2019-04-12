const Discord = require('discord.js');
exports.run = (client, message) => {

	const score = client.getScore.get(message.author.id, message.guild.id);
	return message.reply(`You currently have ${score.points} points and are level ${score.level}!`)
		.catch(error => console.log(error));

};
exports.help = {
	// Update this Section
	name: 'level',
	category: 'eco',
	description: 'Check your level & Exp',
	usage: 'level',
};