// Basic Command Template
exports.run = async (client, message, [user, ...rolename]) => {
	if(message.guild.me.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {

		const userperm = message.member.hasPermission('MANAGE_ROLES_OR_PERMISSIONS');

		if(!userperm) {
			return message.channel.send('You Don\'t Have The Proper Permission To Do this!');
		}
		else{
			const member = message.mentions.members.first();
			const role = message.guild.roles.find(r => r.name === `${rolename}`);
			if(!role) {
				return message.channel.send('That Role Doesn\'t Exist!');
			}
			if(!member) {
				return message.channel.send(`Please Try Again. I Can't Find ${user}`);
			}
			member.roles.remove(role);
			return message.channel.send('Success!');
		}
	}
};
exports.help = {
	// Update this Section
	name: 'removerole',
	category: 'misc',
	description: 'remove roles from a user',
	usage: 'removerole @user role',
};