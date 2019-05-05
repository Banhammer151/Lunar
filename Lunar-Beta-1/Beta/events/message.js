/* eslint-disable linebreak-style */

//const moment = require("moment");
const actions = require("../util/modactions");
module.exports = (client, message) => {
  function getRandomInt() {
    return Math.floor(Math.random() * 500);
  }
  if (message.author.bot) return;
  if (message.guild) {
    const key = `${message.guild.id}-${message.author.id}`;
    actions.checkMention(client, message);
    // Triggers on new users we haven't seen before.
    client.points.ensure(key, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1,
      lastSeen: new Date()
    });
    client.warnings.ensure(key, {
      user: message.author.id,
      guild: message.guild.id,
      warnings: 0
    });
    client.money.ensure(key, {
      user: message.author.id,
      guild: message.guild.id,
      money: 0
    });
    const userkey = `${message.author.id}`;
    client.profile.ensure(userkey, {
      user: message.author.id,
      name: "john or mary doe",
      age: "18",
      gender: "male or female",
      about: "i'm me",
      relationship: "single",
      profileimg: "https://placehold.it/300x250"
    });
    client.drops.ensure(message.guild.id, {
      pick: "false"
    });
    // Increment the points and save them.
    client.points.inc(key, "points");

    // Calculate the user's current level
    const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, "points")));

    // Act upon level up by sending a message and updating the user's level in enmap.
    if (client.points.get(key, "level") < curLevel) {
      message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
      client.points.set(key, curLevel, "level");
    }
  }

  // Grab the settings for this server from the PersistentCollection
  // If there is no guild, get default conf (DMs)
  const settings = client.getSettings(message.guild);
  const key = `${message.guild.id}-${message.author.id}`;


  // For ease of use in commands and functions, we'll attach the settings
  // to the message object, so `message.settings` is accessible.
  message.settings = settings;
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix on this guild is \`${settings.prefix}\``);

  }
  if (message.content.match("pick") && client.drops.get(message.guild.id, "pick") === "true") {
    message.delete();
    
    const moneygained = getRandomInt();
    const moneyuser = client.money.get(key, "money") + moneygained;
    client.money.set(key, moneyuser, "money");
    message.channel.send(`${message.author.tag} Picked up ${moneygained} they now have ${moneyuser}`).then(msg =>{
      msg.delete(10000);
    }).catch(
      console.log("error")
    );
    client.drops.set(message.guild.id, "false", "pick");
  }
  if (client.drops.get(message.guild.id, "pick") === "true") {
    message.reply("I dropped Some Money. Who Will Get it? Type Pick to pick it up");
  }
  var d = Math.random() * 100;
  if (d < 5) {
    client.drops.set(message.guild.id, "true", "pick");
  }
  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if (message.content.indexOf(settings.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Get the user or member's permission level from the elevation
  const level = client.permlevel(message);
  


  // Check whether the command, or alias, exist in the collections defined
  // in app.js.
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  // using this const varName = thing OR otherthign; is a pretty efficient
  // and clean way to grab one of 2 values!
  if (!cmd) return;

  // Some commands may not be useable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel.send(`You do not have permission to use this command.
  Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
  This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    } else {
      return;
    }
  }

  // To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
  // The "level" command module argument will be deprecated in the future.
  message.author.permLevel = level;

  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  if (cmd.help.name === "daily") {
    const delay = 8.64e+7;
    // const start = Date.now();
    if (client.daily.has(message.author.id)) {
      //const elapsed = Date.now() - start;
      //const remaining = delay - elapsed;
      // var time = moment(remaining).format("h:mm:ss");
      return message.reply("Try again Later");
    }
    // Adds the user to the set so that they can't talk for 2.5 seconds
    client.daily.add(message.author.id);
    setTimeout(() => {
      // Removes the user from the set after 2.5 seconds
      client.daily.delete(message.author.id);
    }, delay);
  }


  // If the command exists, **AND** the user has permission, run it.
  client.log("log", `${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, "CMD");
  cmd.run(client, message, args, level);
  
};