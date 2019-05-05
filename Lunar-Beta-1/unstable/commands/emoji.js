const Discord = require("discord.js");
module.exports = {
  name: "emoji",
  description: "Pull an emoji by ID!",
  args: true,
  usage: "<emojiid>",
  guildOnly: true,
  cooldown: 20,
  aliases: ["ei"],
  execute(message, args, client) {
    function findEmoji(id) {
      const temp = this.emojis.get(id);
      if (!temp) return null;
      
      const emoji = Object.assign({}, temp);
      if (emoji.guild) emoji.guild = emoji.guild.id;
      emoji.require_colons = emoji.requiresColons;
      
      return emoji;
    }
    if (!args.length) return message.reply("please specify an emoji id to search for.");

    return client.shard.broadcastEval(`(${findEmoji}).call(this, '${args[0]}')`)
      .then(emojiArray => {
        const foundEmoji = emojiArray.find(emoji => emoji);
        if (!foundEmoji) return message.reply("I could not find such an emoji.");
    
        return client.rest.makeRequest("get", Discord.Constants.Endpoints.Guild(foundEmoji.guild).toString(), true)
          .then(raw => {
            const guild = new Discord.Guild(client, raw);
            const emoji = new Discord.Emoji(guild, foundEmoji);
            return message.reply(`I have found an emoji ${emoji.toString()}!`);
          });
      });
  },
};