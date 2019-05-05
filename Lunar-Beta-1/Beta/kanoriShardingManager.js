/* eslint-disable linebreak-style */
var { ShardingManager } = require("discord.js");
/*const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
console.log("Loading Kanori clusters...")
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
var kanoriWebsite = new Website();
var kanoriManager = new ShardingManager("./kanori.js", { totalShards: 2, respawn: true });

console.log("Loading Kanori shards...");

kanoriManager.on("launch", (shard) => {
  console.log("Loading shard "+ shard.id);
});

kanoriManager.on("message", (shard, msg) => {
  console.log("Eval for Shard "+ shard.id +":\nEvaluted: "+ msg._eval +"\nResult: "+ msg._result);
});

kanoriManager.spawn().then(() => {
  console.log("Success spawning all shards");
});
console.log("Clusters okay!");