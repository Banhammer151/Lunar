exports.run = (client, message, args) => {
	if(message.guild.me.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
		if(message.guild.me.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
			const logs = message.guild.channels.find(channel => channel.name === 'lunar-logs');
			if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
				message.guild.channels.create('lunar-logs', 'text');
			}
			if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
				console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions');
			}
			const userperm = message.member.hasPermission('MANAGE_ROLES_OR_PERMISSIONS');

			if(!userperm) {
				return message.channel.send('You Don\'t Have The Proper Permission To Do this!');
			}
			else{
				try {
					const userrole = args.join(' ');

					message.guild.roles.create({
						data:{
							name: `${userrole}`,
						},
					})
						.then(role => {
							message.guild.channels.find(channel => channel.name === 'lunar-logs').send({ embed: {
								color: 3447003,
								author: {
									name: message.member.user.tag,
									icon_url: message.member.user.avatarURL,
								},
								title: 'Success',

								description: `Successfully Created ${role.name}`,

								timestamp: new Date(),
								footer: {
									icon_url: client.user.avatarURL,
									text: '© Lunar Beta',
								},
							},
							});

						}
						).catch(console.error);

				}
				catch (error) {
					return message.channel.send('Oops Try Again!');
				}
			}
		}
	}
};
exports.help = {
	// Update this Section
	name: 'createrole',
	category: 'moderation',
	description: 'create a role with everyone permission',
	usage: 'createrole rolename',
};