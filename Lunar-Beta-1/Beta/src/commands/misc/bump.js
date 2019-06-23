const { Command } = require("discord.js-commando");
const sql = require("sqlite");
sql.open("./database.sqlite");
const Discord = require("discord.js");
class bumpCommand extends Command {
  constructor(client) {
    super (client, {
      name: "bump",
      aliases: ["bp"],
      group: "misc",
      memberName: "bump",
      throttling: {
        usages: 2,
        duration: 5
      },
      description: "Make me say something",
      examples: ["bump", "bp"],
      guildOnly: true
      
    });
  }
  async run(msg) {
    const now = new Date();
    const lastDate = sql.run("SELECT lastdate FROM settings WHERE guildid = ?", [msg.guild.id]);
    const cooldown = (5 * 60 * 1000);
    if (lastDate[msg.guild.id] === undefined) {
      lastDate[msg.guild.id] = 0;
    }
    if (now - lastDate[msg.guild.id] > cooldown) {
      // It's been more than 10 mins
      let desc = null;
      sql.all("SELECT * FROM settings").then(row => {
        //console.log(row);
        msg.channel.createInvite().then(invite => {
          for (let i = 0; i < row.length; i++) {
            const guild = msg.client.guilds.get(row[i].guildid);
            //console.log(row);
                    
            for (let a = 0; a < row.length; a++) {
              const temp = msg.client.guilds.get(row[a].guildid);
              if (temp) {
                if (temp.id === msg.guild.id) {
                  if (!msg.guild.channels.has(row[a].partner)) {
                    msg.channel.send(`You must first initialize a channel for the bot in ${msg.guild.name} with \`init\`before you can bump your server.`);
                    lastDate[msg.guild.id] = 0;
                    return;
                  }
                  desc = row[a].desc;
                  break;
                }
              }
            }
                    
            if (desc === undefined || desc === null) {
              lastDate[msg.guild.id] = 0;
              return msg.channel.send(`A description for ${msg.guild.name} has not been set yet. Please set one.`);
            }
            if (guild) {
              if (guild.channels.has(row[i].partner) && guild.id !== msg.guild.id) {
                const exampleEmbed = new Discord.RichEmbed()
                  .setColor("#0099ff")
                  .setTitle(`__**${msg.guild.name}**__`)
                  .setURL(`${invite.url}`)
                  .setAuthor(msg.author.username, msg.author.avatarURL)
                  .setDescription(`${desc}`)
                                  
                  .addBlankField()                  
                  .addField("Invite Link", `${invite.url}`)
                  .setImage(`${msg.guild.iconURL}`)
                  .setTimestamp()
                  .setFooter(`__**${msg.guild.name}**__`);               
                
                guild.channels.get(row[i].partner).send(exampleEmbed);
              }
            }
          }
          msg.channel.send(`Bumped sucessfully to **${row.length - 1}** guilds.`);
        });
      });
      lastDate[msg.guild.id] = now;
    } else {
      // It's been less than 10 mins
      const remaining = Math.round(((cooldown) - (now - lastDate[msg.guild.id]))/1000);
      msg.channel.send(`You must wait **${remaining} seconds** before you can use this command again.`);
    } 
  }
}

module.exports = bumpCommand;