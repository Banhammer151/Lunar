import { Client, MessageEmbed } from 'discord.js';

export async function run(client, message, args) {
    async function test() {
        console.log(await neko.sfw.hug());
      }
    test();
    const embed = new MessageEmbed()
      // Set the title of the field
      .setTitle(`Smug`)
      .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
      .setThumbnail(``)
      //.setImage(`${smugimg.url}`)
      // Set the color of the embed
      .setColor(0xFF0000)
      .setTimestamp()
      .setFooter("Smug Sent By Lunar Bot")
     
      
      // Set the main content of the embed
      .setDescription('Smug');
    // Send the embed to the same channel as the message
    await message.channel.send(embed);
}
export const help = {
    name: "smug",
    category: "fun",
    description: "send a smug image",
    usage: "smug"
}