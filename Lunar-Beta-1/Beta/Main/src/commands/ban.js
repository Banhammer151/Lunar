// Basic Command Template

exports.run = async (client, message, [user, ...reason]) => {
	if(message.guild.me.hasPermission('BAN_MEMBERS')) {
		const userperm = message.member.hasPermission('BAN_MEMBERS');
		const member = message.mentions.members.first();

		try{
			if(!userperm) {
				return message.channel.send('You Don\'t Have The Proper Permission To Do this!');
			}
			if(!member) {
				return message.channel.send(`Please Try Again. I Can't Find ${user}`);
			}
			if(!reason) {
				return message.channel.send('Please Specify a reason!');
			}
			message.guild.ban(member);
			return message.channel.send(`Success! ${member} has been Banned`);
		}
		catch (error) {
			return message.channel.send('Sorry I Can\'t Do That');
		}
	}
};
exports.help = {
	// Update this Section
	name: 'ban',
	category: 'moderation',
	description: 'Ban a user With reason of course',
	usage: 'ban @user reason',
};