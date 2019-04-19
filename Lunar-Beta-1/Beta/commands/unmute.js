/* eslint-disable linebreak-style */
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const mutedrole  = message.guild.roles.find(role => role.name === "Muted");
  if (!mutedrole) {
    message.guild.createRole({
      name: "Muted",
      color: "GREY",
    }).catch(message.reply("I dont Have Permisson to Update Roles or Channels"));
  }
  
  const user = message.mentions.users.first();
  // If we have a user mentioned
  if (user) {
    // Now we get the member from the user
    const member = message.guild.member(user);
    // If the member is in the guild
    
    if (member) {
      /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
      member.removeRole(mutedrole).catch(console.error).then(() => {
        // We let the message author know we were able to kick the person
        message.reply(`Successfully unmuted ${user.tag}`);
      }).catch(err => {
        // An error happened
        // This is generally due to the bot not being able to kick the member,
        // either due to missing permissions or role hierarchy
        message.reply("I was unable to unMute The Member");
        // Log the error
        console.error(err);
      });
    } else {
      // The mentioned user isn't in this guild
      message.reply("That user isn't in this guild!");
    }
    // Otherwise, if no user was mentioned
  } else {
    message.reply("You didn't mention the user to unMute!");
  }
  
};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Trial Mod"
};
  
exports.help = {
  name: "unmute",
  category: "Moderation",
  description: "unmute A member From the Guild",
  usage: "unmute @user"
};
  