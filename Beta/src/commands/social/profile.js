// kibando não é mesmo?

var { Command } = require("discord.js-commando");
var { pfp } = require("../../util/CanvasCommand");
var { Attachment } = require("discord.js");
class ProfileCommand extends Command {
  constructor(client) {
    super (client, {
      name: "profile",
      description: "Get the profile of someone",
      group: "social",
      memberName: "profile"
    });
  }
  async run(msg, ) {
    const user = msg.mentions.users.first() || msg.author;
    var eu = await msg.client.db.getUser(user.id);
    pfp(user, eu).then(a => {
      var b = new Attachment(a, "profile-"+ user.username +".jpg");
      msg.channel.send(b);
    });
  }
}
module.exports = ProfileCommand;