/* eslint-disable linebreak-style */
const { inspect } = require("util");
const Discord = require("discord.js");
// This command is to modify/edit guild configuration. Perm Level 3 for admins
// and owners only. Used for changing prefixes and role names and such.

// Note that there's no "checks" in this basic version - no config "types" like
// Role, String, Int, etc... It's basic, to be extended with your deft hands!

// Note the **destructuring** here. instead of `args` we have :
// [action, key, ...value]
// This gives us the equivalent of either:
// const action = args[0]; const key = args[1]; const value = args.slice(2);
// OR the same as:
// const [action, key, ...value] = args;
exports.run = async (client, message, [action, key, ...value], level) => { // eslint-disable-line no-unused-vars
  const userkey = `${message.author.id}`;
  const settings = client.profile.get(userkey);
  if (!action) {
    const embed = new Discord.RichEmbed()
      .setColor("#0099ff")
      .setTitle(`${client.profile.get(userkey, "name")}'s profile`)
      .setURL("https://discord.js.org/")
      .setAuthor(message.author.tag, `${client.profile.get(userkey, "profileimg")}`)
      .setDescription(`${client.profile.get(userkey, "about")}`)
    
      .addBlankField()
      .addField("Age", `${client.profile.get(userkey, "age")}`, true)
      .addField("Gender", `${client.profile.get(userkey, "gender")}`, true)
      .addField("Relationship Status", `${client.profile.get(userkey, "relationship")}`, true)
      .setImage(`${client.profile.get(userkey, "profileimg")}`)
      .setTimestamp()
      .setFooter("Powered By Lunar", "https://i.imgur.com/wSTFkRM.png");

    return message.channel.send(embed);
  }
  if (action === "edit") {
    if (!key) return message.reply("Please specify a key to edit");
    if (!settings[key]) return message.reply("This key does not exist in the settings");
    if (value.length < 1) return message.reply("Please specify a new value");

    settings[key] = value.join(" ");

    client.profile.set(message.author.id, settings);
    message.reply(`${key} successfully edited to ${value.join(" ")}`);
  }
 
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ep"],
  permLevel: "user"
};

exports.help = {
  name: "profile",
  category: "Fun",
  description: "View or change Your Profile for your server.",
  usage: "set <view/get/edit> <key> <value>"
};
