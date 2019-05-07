/* eslint-disable linebreak-style */
var { ShardingManager } = require("discord.js");
/*const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
console.log("Loading Lunar clusters...")
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  //Check if work id is died
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

} else {
  // This is Workers can share any TCP connection
  // It will be initialized using express
  console.log(`Worker ${process.pid} started`);
*/
var Website = require("./src/util/WebsiteLoader");
// eslint-disable-next-line no-unused-vars
var LunarWebsite = new Website();
var LunarManager = new ShardingManager("./Lunar.js", { totalShards: 2, respawn: true });

console.log("Loading Lunar shards...");

LunarManager.on("launch", (shard) => {
  console.log("Loading shard "+ shard.id);
});

LunarManager.on("message", (shard, msg) => {
  console.log("Eval for Shard "+ shard.id +":\nEvaluted: "+ msg._eval +"\nResult: "+ msg._result);
});

LunarManager.spawn().then(() => {
  console.log("Success spawning all shards");
});
console.log("Clusters okay!");