/* eslint-disable no-empty-function */
const { Client, MessageEmbed, Util } = require('discord.js');
const { readdir } = require('fs');
const { createConnection } = require('mysql2');
const Enmap = require('enmap');
const mysql = require('mysql');
const con = require('./modules/functions.js');
const client = new Client({
	shardId: process.argv[1],
	shardCount: process.argv[2],
	fetchAllMembers: true,
});
const { token, mysqlh, mysqlu, mysqlp, mysqldb, mysqlpor } = require('./config.json');


client.con = createConnection({
	host: mysqlh,
	user: mysqlu,
	password: mysqlp, database: mysqldb, port:mysqlpor });
require('./modules/functions.js').default(client);
// readdir("./src/events/", (err, files) => {
//   if (err) return console.error(err);
//   files.forEach(file => {
//     const events = require(`./events/${file}`);
//     let eventName = file.split(".")[0];
//     client.on(eventName, events.bind(null, client));
//   });
// });
client.on('message', (message) =>{
	// if (message.channel.type == 'dm') return;
	const connection = mysql.createConnection({
		host: mysqlh,
		user: mysqlu,
		password: mysqlp,
		database: mysqldb,
		port: mysqlpor });
	const data = {
		guildid: message.guild.id,
	};

	if (message.author.bot) return;
	// eslint-disable-next-line no-shadow
	function fetchID(data, callback) {
		connection.query('SELECT prefix FROM guilds WHERE guildid = ?', data.guildid, function(err, rows) {
			connection.end();
			if (err) {
				callback(err, null);
			}
			else {callback(null, rows[0].prefix);}
		});
	}
	let prefix;

	fetchID(data, function(err, content) {
		if (err) {
			console.log(err);
			// Do something with your error...
		}
		else {
			prefix = content;
			console.log(prefix);
			if (message.content.indexOf(prefix) !== 0) return;

			// Our standard argument/command name definition.
			const args = message.content.slice(prefix.length).trim().split(/ +/g);
			const command = args.shift().toLowerCase();

			// Grab the command data from the client.commands Enmap
			const cmd = client.commands.get(command);

			// If that command doesn't exist, silently exit and do nothing
			if (!cmd) return;

			// Run the command
			cmd.run(client, message, args);
		}
	});
});
// channelCreate
/* Emitted whenever a channel is created.
PARAMETER    TYPE        DESCRIPTION
channel      Channel     The channel that was created    */
client.on('channelCreate', async (channel) => {
	// eslint-disable-next-line no-shadow
	const logs = channel.guild.channels.find(channel => channel.name === 'lunar-logs');
	if (channel.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		channel.guild.channels.create('lunar-logs', 'text');
	}
	if (!channel.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions');
	}
	const entry = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_CREATE' }).then(audit => audit.entries.first());
	let user = '';
	if ((entry.createdTimestamp > (Date.now() - 5000))) {
		user = entry.executor.username;
	}
	const serverid = channel.guild.id;
	const guild = client.guilds.get(serverid);
	// eslint-disable-next-line no-shadow
	guild.channels.find(channel => channel.name === 'lunar-logs').send(`channel ${channel.name} has been created by ${user}`, { code:'asciidoc', split:'true' });
});

// channelDelete
/* Emitted whenever a channel is deleted.
PARAMETER   TYPE      DESCRIPTION
channel     Channel   The channel that was deleted    */
client.on('channelDelete', async (channel) => {
	// eslint-disable-next-line no-shadow
	const logs = channel.guild.channels.find(channel => channel.name === 'lunar-logs');
	if (channel.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		channel.guild.channels.create('lunar-logs', 'text');
	}
	if (!channel.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions');
	}
	const entry = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' }).then(audit => audit.entries.first());
	let user = '';
	if ((entry.createdTimestamp > (Date.now() - 5000))) {
		user = entry.executor.username;
	}
	const serverid = channel.guild.id;
	const guild = client.guilds.get(serverid);
	// eslint-disable-next-line no-shadow
	guild.channels.find(channel => channel.name === 'lunar-logs').send(`channel ${channel.name} has been deleted by ${user}`, { code:'asciidoc', split:'true' });
});

// channelPinsUpdate
/* Emitted whenever the pins of a channel are updated. Due to the nature of the WebSocket event, not much information can be provided easily here - you need to manually check the pins yourself.
PARAMETER    TYPE         DESCRIPTION
channel      Channel      The channel that the pins update occurred in
time         Date         The time of the pins update    */
client.on('channelPinsUpdate', function(channel, time) {

	// channel.channels.find(channels => channels.name === 'lunar-logs').send(`${channel}:${time}`);


});

// channelUpdate
/* Emitted whenever a channel is updated - e.g. name change, topic change.
PARAMETER        TYPE        DESCRIPTION
oldChannel       Channel     The channel before the update
newChannel       Channel     The channel after the update    */
client.on('channelUpdate', (oldChannel, newChannel) => {
	console.log(oldChannel);
	const logs = newChannel.guild.channels.find(channel => channel.name === 'lunar-logs');
	if (newChannel.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		newChannel.guild.channels.create('lunar-logs', 'text');
	}
	if (!newChannel.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions');
	}
	let str = '';

	if(oldChannel.name != newChannel.name) {str += `? Name: \`${oldChannel.name}\` **->** \`${newChannel.name}\`\n`;}


	const embed = new MessageEmbed()
		.addField('Channel Updated', `${str}? Channel ID: ${oldChannel.id}`)
		.setTimestamp()
		.setColor('Red')
		.setFooter('Info Sent By Lunar Bot');

	newChannel.guild.channels.find(channel => channel.name === 'lunar-logs').send(`Channel ${oldChannel.name} was just updated`, embed);
});

// clientUserGuildSettingsUpdate
/* Emitted whenever the client user's settings update.
PARAMETER                  TYPE                       DESCRIPTION
clientUserGuildSettings    ClientUserGuildSettings    The new client user guild settings    */
// client.on('clientUserGuildSettingsUpdate', function(clientUserGuildSettings) {
// 	console.log('clientUserGuildSettingsUpdate -> client user\'s settings update');
// });

// // clientUserSettingsUpdate
// /* Emitted when the client user's settings update.
// PARAMETER             TYPE                  DESCRIPTION
// clientUserSettings    ClientUserSettings    The new client user settings    */
// client.on('clientUserSettingsUpdate', function(clientUserSettings) {
// 	console.log('clientUserSettingsUpdate -> client user\'s settings update');
// });

// debug
/* Emitted for general debugging information.
PARAMETER    TYPE         DESCRIPTION
info         string       The debug information    */
client.on('debug', function(info) {
	console.log(`debug -> ${info}`);
});

// disconnect
/* Emitted when the client's WebSocket disconnects and will no longer attempt to reconnect.
PARAMETER    TYPE              DESCRIPTION
Event        CloseEvent        The WebSocket close event    */
// eslint-disable-next-line no-unused-vars
client.on('disconnect', function(event) {
	console.log('The WebSocket has closed and will no longer attempt to reconnect');
});

// emojiCreate
/* Emitted whenever a custom emoji is created in a guild.
PARAMETER    TYPE          DESCRIPTION
emoji        Emoji         The emoji that was created    */
client.on('emojiCreate', function(emoji) {
	const logs = emoji.guild.channels.find(channel => channel.name === 'lunar-logs');
	if (emoji.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		emoji.guild.channels.create('lunar-logs', 'text');
	}
	if (!emoji.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions');
	}
	const ayy = client.emojis.get(`${emoji.id}`);
	const embed = new MessageEmbed()
		.addField('**[Emoji Added]**', `Emoji: ${ayy.toString()}`)
		.setTimestamp()
		.setColor('Red')
		.setFooter('Info Sent By Lunar Bot');
	emoji.guild.channels.find(channel => channel.name === 'lunar-logs').send(embed);
});

// emojiDelete
/* Emitted whenever a custom guild emoji is deleted.
PARAMETER    TYPE         DESCRIPTION
emoji        Emoji        The emoji that was deleted    */
client.on('emojiDelete', function(emoji) {
	const logs = emoji.guild.channels.find(channel => channel.name === 'lunar-logs');
	if (emoji.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		emoji.guild.channels.create('lunar-logs', 'text');
	}
	if (!emoji.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions');
	}
	const embed = new MessageEmbed()
		.addField('**[Emoji Deleted]**', 'An Emoji Has Been Deleted')
		.setTimestamp()
		.setColor('Red')
		.setFooter('Info Sent By Lunar Bot');
	emoji.guild.channels.find(channel => channel.name === 'lunar-logs').send(embed);

});

// emojiUpdate
/* Emitted whenever a custom guild emoji is updated.
PARAMETER    TYPE       DESCRIPTION
oldEmoji     Emoji      The old emoji
newEmoji     Emoji      The new emoji    */
// client.on('emojiUpdate', function(oldEmoji, newEmoji) {
// 	console.log('a custom guild emoji is updated');
// });

// error
/* Emitted whenever the client's WebSocket encounters a connection error.
PARAMETER    TYPE     DESCRIPTION
error        Error    The encountered error    */
client.on('error', function(error) {
	console.error(`client's WebSocket encountered a connection error: ${error}`);
});

// guildBanAdd
/* Emitted whenever a member is banned from a guild.
PARAMETER    TYPE          DESCRIPTION
guild        Guild         The guild that the ban occurred in
user         User          The user that was banned    */
client.on('guildBanAdd', function(guild, user) {
	const logs = guild.channels.find(channel => channel.name === 'lunar-logs');
	if (guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		guild.channels.create('lunar-logs', 'text');
	}
	if (!guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions');
	}
	const embed = new MessageEmbed()
		.addField('**[User Banned]**', `User: ${user}`)
		.setTimestamp()
		.setColor('Red')
		.setFooter('Info Sent By Lunar Bot');
	guild.channels.find(channel => channel.name === 'lunar-logs').send(embed);

});

// guildBanRemove
/* Emitted whenever a member is unbanned from a guild.
PARAMETER    TYPE         DESCRIPTION
guild        Guild        The guild that the unban occurred in
user         User         The user that was unbanned    */
client.on('guildBanRemove', function(guild, user) {
	const logs = guild.channels.find(channel => channel.name === 'lunar-logs');
	if (guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		guild.channels.create('lunar-logs', 'text');
	}
	if (!guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions');
	}

	const embed = new MessageEmbed()
		.addField('**[User UnBanned]**', `User: ${user}`)
		.setTimestamp()
		.setColor('Red')
		.setFooter('Info Sent By Lunar Bot');
	guild.channels.find(channel => channel.name === 'lunar-logs').send(embed);

});

// guildCreate
/* Emitted whenever the client joins a guild.
PARAMETER    TYPE         DESCRIPTION
guild        Guild        The created guild    */
client.on('guildCreate', function(guild) {
	// eslint-disable-next-line prefer-const
	let guildid = `${guild.id}`, guildname = `${guild.name}`, guildcreatedAt = `${guild.createdAt}`, guildownerID = `${guild.ownerID}`, guildowner = `${guild.owner}`;
	client.guildjoinadd(guildid, guildname, guildcreatedAt, guildownerID, guildowner);
});

// guildDelete
/* Emitted whenever a guild is deleted/left.
PARAMETER    TYPE         DESCRIPTION
guild        Guild        The guild that was deleted    */
client.on('guildDelete', function(guild) {
	const guildid = `${guild.id}`;
	// eslint-disable-next-line no-unused-vars
	con.select('DELETE FROM guilds WHERE `guildid`="' + guildid + '"', function(rows) {
	});
});

// guildMemberAdd
/* Emitted whenever a user joins a guild.
PARAMETER     TYPE               DESCRIPTION
member        GuildMember        The member that has joined a guild    */
client.on('guildMemberAdd', function(member) {
	const logs = member.guild.channels.find(channel => channel.name === 'lunar-logs');
	if (member.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		member.guild.channels.create('lunar-logs', 'text');
	}
	if (!member.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions');
	}

	const embed = new MessageEmbed()
		.addField('**[User Joined]**', `User: ${member.toString()}`)
		.setTimestamp()
		.setColor('Red')
		.setFooter('Info Sent By Lunar Bot');
	member.guild.channels.find(channel => channel.name === 'lunar-logs').send(embed);

});

// guildMemberAvailable
/* Emitted whenever a member becomes available in a large guild.
PARAMETER     TYPE               DESCRIPTION
member        GuildMember        The member that became available    */
client.on('guildMemberAvailable', function(member) {
	console.log(`member becomes available in a large guild: ${member.tag}`);
});

// guildMemberRemove
/* Emitted whenever a member leaves a guild, or is kicked.
PARAMETER     TYPE               DESCRIPTION
member        GuildMember        The member that has left/been kicked from the guild    */
client.on('guildMemberRemove', function(member) {
	const logs = member.guild.channels.find(channel => channel.name === 'lunar-logs');
	if (member.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		member.guild.channels.create('lunar-logs', 'text');
	}
	if (!member.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions');
	}

	const embed = new MessageEmbed()
		.addField('**[User Left]**', `User: ${member.toString()}`)
		.setTimestamp()
		.setColor('Red')
		.setFooter('Info Sent By Lunar Bot');
	member.guild.channels.find(channel => channel.name === 'lunar-logs').send(embed);

});

// guildMembersChunk
/* Emitted whenever a chunk of guild members is received (all members come from the same guild).
PARAMETER      TYPE                      DESCRIPTION
members        Array<GuildMember>        The members in the chunk
guild          Guild                     The guild related to the member chunk    */
// client.on('guildMembersChunk', function(members, guild) {
// 	console.error('a chunk of guild members is received');
// });
// guildUpdate
/* Emitted whenever a guild is updated - e.g. name change.
PARAMETER     TYPE      DESCRIPTION
oldGuild      Guild     The guild before the update
newGuild      Guild     The guild after the update    */
// client.on('guildUpdate', function(oldGuild, newGuild) {
// 	const logs = newGuild.guild.channels.find(channel => channel.name === 'lunar-logs');
// 	if (newGuild.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
// 		newGuild.channels.create('lunar-logs', 'text');
// 	}
// 	if (!newGuild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
// 		console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions');
// 	}

// 	newGuild.channels.find(channel => channel.name === 'lunar-logs').send(`**[guildUpdate]** `);
// });
// messageDelete
/* Emitted whenever a message is deleted.
PARAMETER      TYPE           DESCRIPTION
message        Message        The deleted message    */
client.on('messageDelete', async (message) => {
	const logs = message.guild.channels.find(channel => channel.name === 'lunar-logs');
	if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		message.guild.channels.create('lunar-logs', 'text');
	}
	if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions');
	}
	const entry = await message.guild.fetchAuditLogs({ type: 'MESSAGE_DELETE' }).then(audit => audit.entries.first());
	let user = '';
	if (entry.extra.channel.id === message.channel.id
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
		user = entry.executor.username;
	}
	else {
		user = message.author.username;
	}
	const embed = new MessageEmbed()
	// Set the title of the field
		.setTitle('Message Deleted')
	// Set the color of the embed
		.setColor(0xFF0000)
		.setTimestamp()
		.setFooter('Info Sent By Lunar Bot')
		.addField(`A message was deleted in ${message.channel.name}`, `Message Content: ${message.content}`)
		.addField('Deleted By', `${user}`)

	// Set the main content of the embed
		.setDescription('Action Log/Mod Log');
	// Send the embed to the same channel as the message

	await message.guild.channels.find(channel => channel.name === 'lunar-logs').send(embed);
});

// messageDeleteBulk
/* Emitted whenever messages are deleted in bulk.
PARAMETER    TYPE                              DESCRIPTION
messages     Collection<Snowflake, Message>    The deleted messages, mapped by their ID    */
client.on('messageDeleteBulk', function(messages) {
	const logs = messages.guild.channels.find(channel => channel.name === 'lunar-logs');
	if (messages.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		messages.channels.create('lunar-logs', 'text');
	}
	if (!messages.me.hasPermission('MANAGE_CHANNELS') && !logs) {
		console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions');
	}

	const embed = new MessageEmbed()
		.addField('**[Bulk Delete]**', `Message Amount: ${messages}`)
		.setTimestamp()
		.setColor('Red')
		.setFooter('Info Sent By Lunar Bot');
	messages.guild.channels.find(channel => channel.name === 'lunar-logs').send(embed);

});

// messageReactionAdd
/* Emitted whenever a reaction is added to a message.
PARAMETER              TYPE                   DESCRIPTION
messageReaction        MessageReaction        The reaction object
user                   User                   The user that applied the emoji or reaction emoji     */
// client.on('messageReactionAdd', function(messageReaction, user) {
// 	console.log('a reaction is added to a message');
// });

// // messageReactionRemove
// /* Emitted whenever a reaction is removed from a message.
// PARAMETER              TYPE                   DESCRIPTION
// messageReaction        MessageReaction        The reaction object
// user                   User                   The user that removed the emoji or reaction emoji     */
// client.on('messageReactionRemove', function(messageReaction, user) {
// 	console.log('a reaction is removed from a message');
// });

// messageReactionRemoveAll
/* Emitted whenever all reactions are removed from a message.
PARAMETER          TYPE           DESCRIPTION
message            Message        The message the reactions were removed from    */
// client.on('messageReactionRemoveAll', function(message) {
// 	const logs = message.guild.channels.find(channel => channel.name === 'lunar-logs');
// 	if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
// 		message.channels.create('lunar-logs', 'text');
// 	}
// 	if (!message.me.hasPermission('MANAGE_CHANNELS') && !logs) {
// 		console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions');
// 	}

// 	message.channels.find(channel => channel.name === 'lunar-logs').send(`Someone Removed all the reactions from ${message.id} with the content of ${message.content}`);

// });

// messageUpdate
/* Emitted whenever a message is updated - e.g. embed or content change.
PARAMETER     TYPE           DESCRIPTION
oldMessage    Message        The message before the update
newMessage    Message        The message after the update    */
client.on('messageUpdate', function(oldMessage, newMessage) {
	if (oldMessage.author.bot) return;
	if (newMessage.author.bot) return;
	const logs = newMessage.guild.channels.find(channel => channel.name === 'lunar-logs');
	if (!logs) {
		try{
			newMessage.guild.channels.create('lunar-logs', 'text');
		}
		catch(err) {
			console.log('no perms');
		}
	}
	const embed = new MessageEmbed()
		.setTitle('Message Edited')
		.addField('**[Old Message]**', ` ${oldMessage.content}`)
		.addField('**[New Message]**', ` ${newMessage.content}`)
		.setTimestamp()
		.setColor('Red')
		.setFooter('Info Sent By Lunar Bot');
	newMessage.guild.channels.find(channel => channel.name === 'lunar-logs').send(embed);


});

// presenceUpdate
/* Emitted whenever a guild member's presence changes, or they change one of their details.
PARAMETER    TYPE               DESCRIPTION
oldMember    GuildMember        The member before the presence update
newMember    GuildMember        The member after the presence update    */
// ready
/* Emitted when the client becomes ready to start working.    */
client.on('ready', function() {
	client.user.setPresence({ activity: { name: '!| Working on Beta' }, status: 'STREAMING' })
		.then(console.log('Ready!'))
		.catch(console.error);
});

// reconnecting
/* Emitted whenever the client tries to reconnect to the WebSocket.    */
client.on('reconnecting', function() {
	console.log('client tries to reconnect to the WebSocket');
});

// resume
/* Emitted whenever a WebSocket resumes.
PARAMETER    TYPE          DESCRIPTION
replayed     number        The number of events that were replayed    */
client.on('resume', function(replayed) {
	console.log(`whenever a WebSocket resumes, ${replayed} replays`);
});

// roleCreate
/* Emitted whenever a role is created.
PARAMETER    TYPE        DESCRIPTION
role         Role        The role that was created    */
client.on('roleCreate', function(role) {
	const logs = role.guild.channels.find(channel => channel.name === 'lunar-logs');
	if (!logs) {
		try{
			role.guild.channels.create('lunar-logs', 'text');
		}
		catch(err) {
			console.log('no perms');
		}
	}
	role.guild.channels.find(channel => channel.name === 'lunar-logs').send(`${role.name} Has been Created`, { code:'asciidoc', split:'true' });

});

// roleDelete
/* Emitted whenever a guild role is deleted.
PARAMETER    TYPE        DESCRIPTION
role         Role        The role that was deleted    */
client.on('roleDelete', function(role) {
	const logs = role.guild.channels.find(channel => channel.name === 'lunar-logs');
	if (!logs) {
		try{
			role.guild.channels.create('lunar-logs', 'text');
		}
		catch(err) {
			console.log('no perms');
		}
	}
	role.guild.channels.find(channel => channel.name === 'lunar-logs').send(`${role.name} Has been Deleted`, { code:'asciidoc', split:'true' });

});

// roleUpdate
/* Emitted whenever a guild role is updated.
PARAMETER      TYPE        DESCRIPTION
oldRole        Role        The role before the update
newRole        Role        The role after the update    */
client.on('roleUpdate', function(oldRole, newRole) {
	const logs = newRole.guild.channels.find(channel => channel.name === 'lunar-logs');
	if (!logs) {
		try{
			newRole.guild.channels.create('lunar-logs', 'text');
		}
		catch(err) {
			console.log('no perms');
		}
	}
	newRole.guild.channels.find(channel => channel.name === 'lunar-logs').send(`${oldRole.name} Has been edited`, { code:'asciidoc', split:'true' });

});
/* Emitted whenever a user's details (e.g. username) are changed.
PARAMETER      TYPE        DESCRIPTION
oldUser        User        The user before the update
newUser        User        The user after the update    */
client.on('userUpdate', function(oldUser, newUser) {
	console.log(`${oldUser.name} to ${newUser.name}`);
});

// voiceStateUpdate
/* Emitted whenever a user changes voice state - e.g. joins/leaves a channel, mutes/unmutes.
PARAMETER    TYPE             DESCRIPTION
oldMember    GuildMember      The member before the voice state update
newMember    GuildMember      The member after the voice state update    */
// client.on('voiceStateUpdate', function(oldMember, newMember) {
// 	console.log('a user changes voice state');
// });

// warn
/* Emitted for general warnings.
PARAMETER    TYPE       DESCRIPTION
info         string     The warning   */
client.on('warn', function(info) {
	console.log(`warn: ${info}`);
});
client.commands = new Enmap();

readdir('./src/commands/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		const props = require(`./commands/${file}`);
		const commandName = file.split('.')[0];
		console.log(`Attempting to load command ${commandName}`);
		client.commands.set(commandName, props);
	});
});


client.login(token);