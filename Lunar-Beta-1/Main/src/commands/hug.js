import { Client, MessageEmbed } from 'discord.js';
import { hug } from '../responses.json';

export async function run(client, message, args) {
    // async function test() {
    //     console.log(await neko.sfw.hug());
    //   }
    // test();
    // const embed = new MessageEmbed()
    //   // Set the title of the field
    //   .setTitle(`Smug`)
    //   .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
    //   .setThumbnail(``)
    //   //.setImage(`${smugimg.url}`)
    //   // Set the color of the embed
    //   .setColor(0xFF0000)
    //   .setTimestamp()
    //   .setFooter("Smug Sent By Lunar Bot")
     
      
    //   // Set the main content of the embed
    //   .setDescription('Smug');
    // // Send the embed to the same channel as the message
    // await message.channel.send(embed);
    var randomres = hug.text[Math.floor(Math.random() * hug.text.length)];
    var randomimg = hug.img[Math.floor(Math.random() * hug.img.length)];
    console.log(randomres)
}
export const help = {
    name: "hug",
    category: "roleplaying",
    description: "give another member a hug",
    usage: "hug @mention"
}