const { Client, MessageEmbed } = 'discord.js';

module.run = async (client, message, args) => {
	const embed = new MessageEmbed()
	// Set the title of the field
		.setTitle('Smug')
		.setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
		.setThumbnail('')
	// .setImage(`${smugimg.url}`)
	// Set the color of the embed
		.setColor(0xFF0000)
		.setTimestamp()
		.setFooter('Smug Sent By Lunar Bot')


	// Set the main content of the embed
		.setDescription('Smug');
	// Send the embed to the same channel as the message
	await message.channel.send(embed);
};
module.help = {
	name: 'smug',
	category: 'fun',
	description: 'send a smug image',
	usage: 'smug',
};