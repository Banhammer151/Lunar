const { Client, MessageEmbed } = 'discord.js';
exports.run = async (client, message) => {
	const member = message.mentions.members.first() || message.member,
		user = message.mentions.users.first() || message.author;
	if(message.mentions.users.first()) {
		const embed = new MessageEmbed()
		// Set the title of the field
			.setTitle(`User Info for ${user.tag}`)
			.setThumbnail(`${user.displayAvatarURL()}`)
		// Set the color of the embed
			.setColor(0xFF0000)
			.setTimestamp()
			.setFooter('Info Sent By Lunar Bot')
			.addField('Server Join Date:', `${member.joinedAt}`)
			.addField('Roles:', member.roles.filter(r => r.name !== '@everyone').map(role => `${role.toString()}`).join(', '), true)
			.addField('Created', `${user.createdAt}`)

		// Set the main content of the embed
			.setDescription('Heres the Basic Info You Asked For');
		// Send the embed to the same channel as the message
		await message.channel.send(embed);
	}
	else{
		const embed = new MessageEmbed()
		// Set the title of the field
			.setTitle(`User Info for ${message.author.tag}`)
			.setThumbnail(`${message.author.displayAvatarURL()}`)
		// Set the color of the embed
			.setColor(0xFF0000)
			.setTimestamp()
			.setFooter('Info Sent By Lunar Bot')
			.addField('Server Join Date:', `${message.member.joinedAt}`)
			.addField('Roles:', member.roles.filter(r => r.name !== '@everyone').map(role => `${role.toString()}`).join(', '), true)
			.addField('Created', `${message.author.createdAt}`)

		// Set the main content of the embed
			.setDescription('Heres the Basic Info You Asked For');
		// Send the embed to the same channel as the message
		await message.channel.send(embed);
	}
};
exports.help = {
	name: 'userinfo',
	category: 'misc',
	description: 'Grab Information about a User',
	usage: 'userinfo @mention',
};