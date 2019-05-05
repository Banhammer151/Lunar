exports.run = async (msg) => {
    var guildConf = await msg.client.db.getGuild(msg.guild.id)
    if (guildConf.bwf.length > 0) {
     if (msg.author.bot || msg.guild.owner == msg.author) return
    var alreadycheck = []
    msg.content = msg.content.toLowerCase();
    guildConf.bwf.forEach(word => {
      if (!alreadycheck.includes(word)) {
        if (msg.content.includes(word)) {
          alreadycheck.push(word)
          try {
            msg.delete();
            return msg.channel.send("Hey <@"+ msg.author.id +">, this word is banned here. I don't want see you talking this, so...");
          } catch (e) {
            return msg.channel.send("Hey <@"+ msg.author.id +">, please don't speak this word here! (Tip: If you give me the MANAGE_MESSAGES permission, i will delete this message.)");
          }
        }
      }
    });
  }
  if (msg.content.startsWith('<@'+ msg.client.user.id +'>') && !msg.content.split(" ").slice(1).join(" ")) {
    msg.channel.send(":wave: | Heya, my name is Kanori.\nFor help, use `@Kanori help`\nFor info, use `@Kanori botinfo`");
  }
}