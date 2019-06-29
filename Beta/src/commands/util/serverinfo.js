const { Command } = require("discord.js-commando");
const Discord = require("discord.js");

class ServerInfoCommand extends Command {
  constructor(client) {
    super (client, {
      name: "serverinfo",
      aliases: ["sinfo"],
      group: "util",
      memberName: "serverinfo",
      description: "Get info about a server",
      guildOnly: true
    });
  }
  async run(msg) {
    function checkDays(date) {
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const days = Math.floor(diff / 86400000);
      return days + (days == 1 ? " day" : " days") + " ago";
    }
    const verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
    const region = {
      "brazil": ":flag_br: Brazil",
      "eu-central": ":flag_eu: Central Europe",
      "singapore": ":flag_sg: Singapore",
      "us-central": ":flag_us: U.S. Central",
      "sydney": ":flag_au: Sydney",
      "us-east": ":flag_us: U.S. East",
      "us-south": ":flag_us: U.S. South",
      "us-west": ":flag_us: U.S. West",
      "eu-west": ":flag_eu: Western Europe",
      "vip-us-east": ":flag_us: VIP U.S. East",
      "london": ":flag_gb: London",
      "amsterdam": ":flag_nl: Amsterdam",
      "hongkong": ":flag_hk: Hong Kong",
      "russia": ":flag_ru: Russia",
      "southafrica": ":flag_za:  South Africa"
    };
    const embed = new Discord.RichEmbed()
      .setAuthor(msg.guild.name, msg.guild.iconURL)
      .addField("Name", msg.guild.name, true)
      .addField("ID", msg.guild.id, true)
      .addField("Owner", `${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator}`, true)
      .addField("Region", region[msg.guild.region], true)
      .addField("Total | Humans | Bots", `${msg.guild.members.size} | ${msg.guild.members.filter(member => !member.user.bot).size} | ${msg.guild.members.filter(member => member.user.bot).size}`, true)
      .addField("Verification Level", verifLevels[msg.guild.verificationLevel], true)
      .addField("Channels", msg.guild.channels.size, true)
      .addField("Roles", msg.guild.roles.size, true)
      .addField("Creation Date", `${msg.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(msg.channel.guild.createdAt)})`, true)
      .setThumbnail(msg.guild.iconURL);
    msg.channel.send({embed});
  }
}

module.exports = ServerInfoCommand;