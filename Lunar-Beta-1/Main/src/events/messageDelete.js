import { Client, MessageEmbed } from 'discord.js';
module.exports = async (client, message) => {
    const logs = message.guild.channels.find(channel => channel.name === "lunar-logs");
    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
      message.guild.channels.create('lunar-logs', 'text');
    }
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) { 
      console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions')
    }  
    const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
    let user = ""
      if (entry.extra.channel.id === message.channel.id
        && (entry.target.id === message.author.id)
        && (entry.createdTimestamp > (Date.now() - 5000))
        && (entry.extra.count >= 1)) {
      user = entry.executor.username
    } else { 
      user = message.author.username
    }
    const embed = new MessageEmbed()
      // Set the title of the field
      .setTitle(`Message Deleted`)      
      // Set the color of the embed
      .setColor(0xFF0000)
      .setTimestamp()
      .setFooter("Info Sent By Lunar Bot")
      .addField(`A message was deleted in ${message.channel.name}`, `Message Content: ${message.content}`)      
      .addField("Deleted By", `${user}`)
      
      // Set the main content of the embed
      .setDescription('Action Log/Mod Log');
    // Send the embed to the same channel as the message
     
     await message.guild.channels.find(channel => channel.name === "lunar-logs").send(embed);
  }