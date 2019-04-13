
client.on("messageDelete", async (message) => {
  const logs = message.guild.channels.find(channel => channel.name === "lunar-logs");
  if (message.guild.me.hasPermission("MANAGE_CHANNELS") && !logs) {
    message.guild.channels.create("lunar-logs", "text");
  }
  if (!message.guild.me.hasPermission("MANAGE_CHANNELS") && !logs) {
    console.log("The logs channel does not exist and tried to create the channel but I am lacking permissions");
  }
  const entry = await message.guild.fetchAuditLogs({ type: "MESSAGE_DELETE" }).then(audit => audit.entries.first());
  let user = "";
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
    .setTitle("Message Deleted")
  // Set the color of the embed
    .setColor(0xFF0000)
    .setTimestamp()
    .setFooter("Info Sent By Lunar Bot")
    .addField(`A message was deleted in ${message.channel.name}`, `Message Content: ${message.content}`)
    .addField("Deleted By", `${user}`)

  // Set the main content of the embed
    .setDescription("Action Log/Mod Log");
  // Send the embed to the same channel as the message

  await message.guild.channels.find(channel => channel.name === "lunar-logs").send(embed);
});

// messageDeleteBulk
/* Emitted whenever messages are deleted in bulk.
PARAMETER    TYPE                              DESCRIPTION
messages     Collection<Snowflake, Message>    The deleted messages, mapped by their ID    */
client.on("messageDeleteBulk", function(messages) {
  const logs = messages.guild.channels.find(channel => channel.name === "lunar-logs");
  if (messages.guild.me.hasPermission("MANAGE_CHANNELS") && !logs) {
    messages.channels.create("lunar-logs", "text");
  }
  if (!messages.me.hasPermission("MANAGE_CHANNELS") && !logs) {
    console.log("The logs channel does not exist and tried to create the channel but I am lacking permissions");
  }

  const embed = new MessageEmbed()
    .addField("**[Bulk Delete]**", `Message Amount: ${messages}`)
    .setTimestamp()
    .setColor("Red")
    .setFooter("Info Sent By Lunar Bot");
  messages.guild.channels.find(channel => channel.name === "lunar-logs").send(embed);

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
client.on("messageUpdate", function(oldMessage, newMessage) {
  if (oldMessage.author.bot) return;
  if (newMessage.author.bot) return;
  const logs = newMessage.guild.channels.find(channel => channel.name === "lunar-logs");
  if (!logs) {
    try {
      newMessage.guild.channels.create("lunar-logs", "text");
    }
    catch (err) {
      console.log("no perms");
    }
  }
  const embed = new MessageEmbed()
    .setTitle("Message Edited")
    .addField("**[Old Message]**", ` ${oldMessage.content}`)
    .addField("**[New Message]**", ` ${newMessage.content}`)
    .setTimestamp()
    .setColor("Red")
    .setFooter("Info Sent By Lunar Bot");
  newMessage.guild.channels.find(channel => channel.name === "lunar-logs").send(embed);


});

// presenceUpdate
/* Emitted whenever a guild member's presence changes, or they change one of their details.
PARAMETER    TYPE               DESCRIPTION
oldMember    GuildMember        The member before the presence update
newMember    GuildMember        The member after the presence update    */
// ready
/* Emitted when the client becomes ready to start working.    */
client.on("ready", async () => {
  client.user.setPresence({ activity: { name: "!| Working on Beta" }, status: "STREAMING" })
    .then(console.log("Ready!"))
    .catch(console.error);
  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
  if (!table["count(*)"]) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
    // Ensure that the "id" row is always unique and indexed.
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  const guilds = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'guilds';").get();
  if (!guilds["count(*)"]) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE guilds (id TEXT PRIMARY KEY, guild TEXT, guildname text, guildowner, prefix text, welcomeMessage text, welcomeMessageEn text, welcomeChannel text, welcomeEmbed text, image text);").run();
    // Ensure that the "id" row is always unique and indexed.
    sql.prepare("CREATE UNIQUE INDEX idx_guilds_id ON guilds (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  // And then we have two prepared statements to get and set the score data.
  client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
  client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");
  client.getPrefix = sql.prepare("SELECT prefix FROM guilds WHERE guild = ?");

});

// reconnecting
/* Emitted whenever the client tries to reconnect to the WebSocket.    */
client.on("reconnecting", function() {
  console.log("client tries to reconnect to the WebSocket");
});

// resume
/* Emitted whenever a WebSocket resumes.
PARAMETER    TYPE          DESCRIPTION
replayed     number        The number of events that were replayed    */
client.on("resume", function(replayed) {
  console.log(`whenever a WebSocket resumes, ${replayed} replays`);
});

// roleCreate
/* Emitted whenever a role is created.
PARAMETER    TYPE        DESCRIPTION
role         Role        The role that was created    */
client.on("roleCreate", function(role) {
  const logs = role.guild.channels.find(channel => channel.name === "lunar-logs");
  if (!logs) {
    try {
      role.guild.channels.create("lunar-logs", "text");
    }
    catch (err) {
      console.log("no perms");
    }
  }
  role.guild.channels.find(channel => channel.name === "lunar-logs").send({ embed: {
    color: 3447003,
    title: "Success",

    description: `Successfully Created ${role.name}`,

    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© Lunar Beta",
    },
  },
  });
});

// roleDelete
/* Emitted whenever a guild role is deleted.
PARAMETER    TYPE        DESCRIPTION
role         Role        The role that was deleted    */
client.on("roleDelete", function(role) {
  const logs = role.guild.channels.find(channel => channel.name === "lunar-logs");
  if (!logs) {
    try {
      role.guild.channels.create("lunar-logs", "text");
    }
    catch (err) {
      console.log("no perms");
    }
  }
  role.guild.channels.find(channel => channel.name === "lunar-logs").send({ embed: {
    color: 3447003,
    title: "Success",

    description: `Successfully Deleted ${role.name}`,

    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© Lunar Beta",
    },
  },
  });

});


// roleUpdate
/* Emitted whenever a guild role is updated.
PARAMETER      TYPE        DESCRIPTION
oldRole        Role        The role before the update
newRole        Role        The role after the update    */
client.on("roleUpdate", function(oldRole, newRole) {
  const logs = newRole.guild.channels.find(channel => channel.name === "lunar-logs");
  if (!logs) {
    try {
      newRole.guild.channels.create("lunar-logs", "text");
    }
    catch (err) {
      console.log("no perms");
    }
  }
  newRole.guild.channels.find(channel => channel.name === "lunar-logs").send({ embed: {
    color: 3447003,
    title: "Success",

    description: `Successfully Updated ${oldRole.name} to ${newRole.name}`,

    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© Lunar Beta",
    },
  },
  });

});
/* Emitted whenever a user's details (e.g. username) are changed.
PARAMETER      TYPE        DESCRIPTION
oldUser        User        The user before the update
newUser        User        The user after the update    */
client.on("userUpdate", function(oldUser, newUser) {
  const uchannel = client.channels.find(channel => channel.name === "lunar-logs");
  uchannel.send("User updated!");
  if (oldUser.username != newUser.username) {
    uchannel.send(oldUser.username + " changed his username to " + newUser.username + "!");
  }
  if (oldUser.avatar != newUser.avatar) {
    uchannel.send({ embed: {
      color: 3447003,
      title: "Success",
      image: `${newUser.avatarURL}`,
      description: `User ${newUser.username} Updated`,

      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© Lunar Beta",
      },
    },
    });
  }
}
);

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
client.on("warn", function(info) {
  console.log(`warn: ${info}`);
});


client.login(token);