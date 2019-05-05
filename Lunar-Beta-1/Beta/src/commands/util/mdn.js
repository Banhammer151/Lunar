const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js')
const { get } = require('snekfetch')
const scrapeMdn = require("scrape-mdn")

class MDNCommand extends Command {
  constructor (client) {
    super (client, {
      name: "mdn",
      aliases: ["mdndoc"],
      group: "util",
      memberName: "mdn",
      throttling: {
        usages: 2,
        duration: 5
      },
      description: "Search something on Mozilla Developers Network",
      examples: ['mdn Array.prototype.findIndex'], 
      guildOnly: false,
      args: [{
        key: 'text',
        label: 'text',
        prompt: "Please enter what you wanna search!",
        type: "string"
      }]
    });
  }
  async run (msg, { text }) {
    scrapeMdn.search(text).then((results) => {
      var {url, title, description} = results[0];
      var embed = new RichEmbed().setTitle(title).setDescription(description).setAuthor("MDN Docs", "https://lh3.googleusercontent.com/proxy/k3_TSypshrK8LGd9uo9YdXpku9tLWqNsqxgyJMA3WCKiKRiyz3-8Ak-Iqll5-4krJ4_b6GrjfsLglb0O9S2lbL59HiMi-eXKw1WWg2MGLzjJHIWxQb_gbyWhzGHogiiK1A=w408-h360-nc").setColor(0x4169e1).setURL(url)
      msg.channel.send(embed)
    });
  }
}

module.exports = MDNCommand;
