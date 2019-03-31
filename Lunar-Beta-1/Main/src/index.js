import { Client } from "discord.js";
import { readdir } from "fs";
import { createConnection } from "mysql2";
import Enmap from "enmap";
const client = new Client({
  shardId: process.argv[1],
  shardCount: process.argv[2],
  fetchAllMembers: true
});
import config, { token } from "./config.json";

client.config = config;
client.con = createConnection({
    host: client.config.mysqlh,
     user: client.config.mysqlu,
  password: client.config.mysqlp, database: client.config.mysqldb, port: client.config.mysqlpor});
require("./modules/functions.js").default(client);
readdir("./src/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const events = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, events.bind(null, client));
  });
});
client.commands = new Enmap();

readdir("./src/commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});


client.login(token);