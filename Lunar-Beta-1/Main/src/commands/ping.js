//Basic Command Template
import { cmd } from "../modules/functions.js";
export function run(client, message, args) {
    if(message.member.guild.me.hasPermission("SEND_MESSAGES")){
    let guildid = `${message.guild.id}`;
            cmd('SELECT * FROM permoveride WHERE guildid ="' + guildid + '" and command = "ping"' , function(rows, fields) {
                //Change command = "ping" to Command Name              
                const usersRows = JSON.parse(JSON.stringify(rows));
                var usrole = [];
                for(var k in usersRows) {                    
                    usrole.push(usersRows[k].role);
                 }
                 if(usrole.length === 0){
//console.error("1");
                   return message.channel.send("pong!").catch(console.error);
                 }else if(message.member.roles.some(r=> usrole.includes(r.name)) ) {
                    //    console.error("2");
                        return  message.channel.send("pong!").catch(console.error);
                    } else {  
                   //     console.error("3"); 
                        return message.channel.send("You Shall Not Pass!");
                    }
                });
            }
}
export const help = {
    //Update this Section
    name: "ping",
    category: "fun",
    description: "ping",
    usage: "ping"
}