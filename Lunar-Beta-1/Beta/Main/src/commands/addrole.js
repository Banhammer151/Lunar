// Basic Command Template
const { Client, MessageEmbed } = 'discord.js';
exports.run = async (client, message, args) => {
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
				const userrole = args.slice(1).join(' ');
				const member = message.mentions.members.first();
				const role = message.guild.roles.find(r => r.name === `${userrole}`);
				if(!role) {
					return message.channel.send('That Role Doesn\'t Exist!');
				}
				if(!member) {
					return message.channel.send(`Please Try Again. I Can't Find ${user}`);
				}

				member.roles.add(role).then(member => {
					message.guild.channels.find(channel => channel.name === 'lunar-logs').send({ embed: {
						color: 3447003,
						author: {
							name: member.user.tag,
							icon_url: member.user.avatarURL,
						},
						title: 'Success',

						description: `Successfully Added ${role.name} to ${member.user.tag}`,

						timestamp: new Date(),
						footer: {
							icon_url: client.user.avatarURL,
							text: '© Lunar Beta',
						},
					},
					});

				}
				)
					.catch(console.error);

			}
			catch (error) {
				return message.channel.send('Oops Try Again! I\'m either lower than that role or I don\'t have permission or it doesn\'t exist');
			}
		}


	}
};


exports.help = {
	// Update this Section
	name: 'addrole',
	category: 'moderation',
	description: 'Add a Role to A User',
	usage: 'addrole @user rolename',
};