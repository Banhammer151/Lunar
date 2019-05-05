const { Command } = require('discord.js-commando');
var { weather } = require('../../util/CanvasCommand');
var weatherjs = require('weather-js')

class WeatherCommand extends Command {
  constructor (client) {
    super (client, {
      name: "weather",
      group: "util",
      memberName: "weather",
      description: "Weather info",
      guildOnly: false,
      args: [{ key: "place", type: "string", prompt: "Enter the place to search" }]
    });
  }
  async run (msg, { place }) {
    var msag = await msg.channel.send("Working on you request, master! This can take up to 5 seconds.");
    var { Attachment } = require ('discord.js');
    weatherjs.find({ search: place, degreeType: 'C' }, function (e, obj) {
      if (e) return msg.channel.send("Sorry master! I found a error so i can't tell you the weather!");
      if (obj.length <= 0) return msg.channel.send("No cities found! Enter a valid city, please!")
      weather(obj[0]).then(a => {
        var b = new Attachment(a, "canvas-gostoso.jpg");
        msag.delete()
        msg.channel.send("Here is your weather info, master!", b);
      });
    });
  }
}

module.exports = WeatherCommand;