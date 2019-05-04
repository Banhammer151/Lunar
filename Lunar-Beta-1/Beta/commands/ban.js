/* eslint-disable linebreak-style */
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const user = message.mentions.users.first();
  if (user) {
    const member = message.guild.member(user);
    if (member) {
      member.ban({
        reason: "They were bad!",
      }).then(() => {
        // We let the message author know we were able to ban the person
        message.reply(`Successfully banned ${user.tag}`);
      }).catch(err => {
        // An error happened
        // This is generally due to the bot not being able to ban the member,
        // either due to missing permissions or role hierarchy
        message.reply("I was unable to ban the member");
        // Log the error
        console.error(err);
      });
    } else {
      // The mentioned user isn't in this guild
      message.reply("That user isn't in this guild!");
    }
  } else {
    // Otherwise, if no user was mentioned
    message.reply("You didn't mention the user to ban!");
  }
  
};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};
  
exports.help = {
  name: "ban",
  category: "Moderation",
  description: "Bans a User From The Guild",
  usage: "ban @User"
};
  