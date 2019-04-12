const { MessageEmbed, Util } = require('discord.js');
module.exports = async (oldMessage, newMessage) => {


	if(oldMessage.content == newMessage.content) return;


	const logs = newMessage.guild.channels.find(channel => channel.name === 'lunar-logs');
	if (newMessage.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		newMessage.guild.channels.create('lunar-logs', 'text');
	}
	if (!newMessage.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions');
	}
	const embed = new MessageEmbed()
		.setAuthor(`${oldMessage.author}`)
		.addField('Message Updated', `► Previously: \`${oldMessage.content}\`\n► Now: \`${newMessage.content}\`\n► Message ID: ${oldMessage.id}`)
		.setTimestamp()
		.setColor('blue')
		.setFooter('Have a nice day :)');

	newMessage.guild.channels.find(channel => channel.name === 'lunar-logs').send(embed);
};

