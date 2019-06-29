/* eslint-disable linebreak-style */
var { FriendlyError } = require("discord.js-commando");
exports.run = async (cmd, err) => {
  if (err instanceof FriendlyError) return;
  console.error(`Oopsie Woopsie! Error in command ${cmd.groupID}:${cmd.memberName}!`, err);
};