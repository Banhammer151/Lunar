/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
const con = require('../modules/functions.js');
module.exports = (client, guild) => {
	const guildid = `${guild.id}`;
	con.select('DELETE FROM guilds WHERE `guildid`="' + guildid + '"', function(rows) {
	});
};