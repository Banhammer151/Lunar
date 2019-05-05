const { ShardingManager } = require("discord.js");
const config = require("./config.json");
const manager = new ShardingManager("./bot.js", { token: config.token });

manager.spawn();
manager.on("launch", shard => console.log(`Launched shard ${shard.id}`));
manager.on("message", (shard, message) => {
  console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
});