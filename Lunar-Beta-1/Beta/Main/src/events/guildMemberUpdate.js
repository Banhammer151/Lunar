const { MessageEmbed, Util } = require('discord.js');
module.exports = async (guild, oldMember, newMember, client) => {


	const logs = newMember.guild.channels.find(channel => channel.name === 'lunar-logs');
	if (newMember.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		newMember.guild.channels.create('lunar-logs', 'text');
	}
	if (!newMember.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions');
	}
	const embed = new MessageEmbed({
		timestamp: new Date(),
		author: {
			name: `${newMember.user.tag} (${newMember.user.id})`,
			iconURL: newMember.user.displayAvatarURL(128),
		},
	});

	if (!oldMember.nickname && oldMember.nickname !== newMember.nickname) {
		// New nickname, no old nickname
		embed
			.setTitle('New Member Nickname')
			.addField('New nickname', Util.escapeMarkdown(newMember.nickname))
			.setColor('#4caf50')
			.setThumbnail('https://dice.js.org/images/statuses/guildMemberUpdate/new.png');
		return guild.channels.find(channel => channel.name === 'lunar-logs').send(embed);
	}
	else if (!newMember.nickname && oldMember.nickname !== newMember.nickname) {
		// Reset nickname
		embed
			.setTitle('Member Nickname Removed')
			.addField('Previous nickname', Util.escapeMarkdown(oldMember.nickname))
			.setColor('#f44336')
			.setThumbnail('https://dice.js.org/images/statuses/guildMemberUpdate/removed.png');
		return guild.channels.find(channel => channel.name === 'lunar-logs').send(embed);
	}
	else if (oldMember.nickname !== newMember.nickname) {
		// Nickname change
		embed
			.setTitle('Changed Member Nickname')
			.addField('New nickname', Util.escapeMarkdown(newMember.nickname))
			.addField('Previous nickname', Util.escapeMarkdown(oldMember.nickname))
			.setColor('#ffc107')
			.setThumbnail('https://dice.js.org/images/statuses/guildMemberUpdate/changed.png');
		return guild.channels.find(channel => channel.name === 'lunar-logs').send(embed);
	}

	return null;

};

