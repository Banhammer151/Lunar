/* eslint-disable prefer-const */
module.exports = (client, guild) => {
	let guildid = `${guild.id}`, guildname = `${guild.name}`, guildcreatedAt = `${guild.createdAt}`, guildownerID = `${guild.ownerID}`, guildowner = `${guild.owner}`;
	client.guildjoinadd(guildid, guildname, guildcreatedAt, guildownerID, guildowner);
};
