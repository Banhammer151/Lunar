exports.run = async (client, message, args, level) => {
  const moment = require("moment");
 
  function getRandomInt() {
    return Math.floor(Math.random() * 500);
  }

    
      
  const key = `${message.guild.id}-${message.author.id}`;
    
  const moneygained = getRandomInt();
  const moneyuser = client.money.get(key, "money") + moneygained;
  client.money.set(key, moneyuser, "money");
  //const percent = Math.floor(0.1 * Math.sqrt(client.points.get(key, "points")));
  message.reply(`You Earned Yourself ${moneygained}`);


};
      
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};
      
exports.help = {
  name: "daily",
  category: "Fun",
  description: "Get your Coin... Only once a day please!",
  usage: "money"
};
      