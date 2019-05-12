const { RichEmbed : Embed } = require("discord.js");
const slowmode = new Map();
const ratelimit = 7500;

exports.getUser = async (client, message, id) => {
  let target;
  try {
    target = message.mentions.users.first() || client.users.get(id) || await client.fetchUser(id);
  } catch (e) {
    // User doesn't exist
  }
  return target;
};

exports.getMember = async (message, id) => {
  let target;
  try {
    target = message.mentions.members.first() || message.guild.member(id) || await message.guild.fetchMember(id);
  } catch (e) {
    // User doesn't exist
  }
  return target;
};

exports.checkMention = async (client, msg) => {
  if (!msg.guild || !msg.member) return;
  if (msg.guild.id === "110373943822540800") return; // ignore DBots
  const conf = client.getSettings(msg.guild);
  const modChannel = msg.guild.channels.find(c => c.name === conf.modLogChannel);

  // Ignore DMS, Webhooks, Mods, and break if no perms
  if (!msg.guild || !msg.member || !msg.guild.me.permissions.has("BAN_MEMBERS") || !msg.member.bannable) return;
  
  // Ignore if 1 mention and it's a bot (bot interaction)
  if (msg.mentions.users.size == 1 && msg.mentions.users.first().bot) return;

  // If there is no trace of the author in the slowmode map, add him.
  let entry = slowmode.get(msg.author.id);
  if (!entry) {
    entry = 0;
    slowmode.set(msg.author.id, entry);
  }

  // Count BOTH user and role mentions
  entry += msg.mentions.users.size + msg.mentions.roles.size;

  const key =`${msg.guild.id}-${msg.author.id}`;
  client.logs.ensure(key, []);

  // If the total number of mentions in the last `ratelimit` is above the server ban level... well, ban their ass.
  if (entry > 10) {
    //client.emit("log", `[${msg.guild.name}] ${msg.author.username} spamming mentions x${entry}`);
    let wasDMed;
    await msg.author.send(`You've been banned from ${msg.guild.name} by ${client.user.tag}, for spamming mentions.\nThere is no appeal system, so... kthxbai`)
      .catch(() => {
        wasDMed = "Member could not be DMed before autoban";
      });
    try {
      await msg.guild.ban(msg.author.id, {reason: "Automatic Ban: Mention Spam", days: 1});
  
      const embed = new Embed()
        .setTitle("Spam Mention Ban")
        .setDescription(`**Action** : Auto-Ban\n**User** : ${msg.author.tag} (${msg.author.id})\n**Reason** : ${"Automatic Ban: Mention Spam"}\n${wasDMed}`)
        .setThumbnail(msg.author.displayAvatarURL)
        .setAuthor(`${client.user.tag} (${client.user.id})`, client.user.displayAvatarURL)
        .setColor([255, 0, 0])
        .setTimestamp();
      const embedMessage = await modChannel.send(embed);
  
      client.logs.push(key, {
        type: "autoban", reason: "Automatic Ban: Mention Spam", timestamp: Date.now(), user: msg.id, mod: client.user.id,
        channel: modChannel.id, message: embedMessage.id
      });
      msg.channel.send(`:no_entry_sign: User ${msg.author.username}#${msg.author.discriminator} (${msg.author.id}) has just been banned for mentionning too many users. :hammer:
  Users that have been mentioned, we apologize for the annoyance. Please don't be mad!`);
    } catch (e) {
      await msg.edit(`Could not ban user ${msg.author.tag}: ${e}`);
    }
  } else {
    setTimeout(()=> {
      entry -= msg.mentions.users.size + msg.mentions.roles.size;
      if (entry <= 0) slowmode.delete(msg.author.id);
    }, ratelimit);
  }
};