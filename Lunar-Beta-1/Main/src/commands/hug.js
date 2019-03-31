import { Client, MessageEmbed } from 'discord.js';
import { hug } from '../responses.json';

export async function run(client, message, args) {
    const keys = Object.keys(hug)
    const randIndex = Math.floor(Math.random() * keys.length)
    const randKey = keys[randIndex]
    const name = hug[randKey]
    if(!message.mentions.users.first()){
        let user = 'themselves';
        await message.channel.send(`${name.text} ${user.toString()}`, {files:[name.img]});
    }else{
        let user = message.mentions.users.first();
        await message.channel.send(`${name.text} ${user.toString()}`, {files:[name.img]});
    }

    

    
}
export const help = {
    name: "hug",
    category: "roleplaying",
    description: "give another member a hug",
    usage: "hug @mention"
}