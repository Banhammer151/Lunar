/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
var dblapi = require("dblapi.js");
var sneky = require("snekfetch");
var Shard = require ("./ShardingUtils");
var shard = new Shard();
var app = require("./WebsiteLoader").app;

class BotList {
  constructor(opt = {}) {
    if (!opt.client) throw new ReferenceError("No client passed to the class.");
    this.client = opt.client;
    this.init(this.client);
  }
  async init(client) {
    console.log("Loading BotList class...");
    
    // DBL area
    this.dbl =  new dblapi(process.env.DBLTOKEN, { statsInterval: 900000 }, client);
    this.dbl.on("error", (err) => {
      console.error(err);
    });
    this.dbl.on("posted", () => {
      console.log("Posted stats to DBL.");
    });
    client.dbl = this.dbl;
  }
}

module.exports = BotList; 