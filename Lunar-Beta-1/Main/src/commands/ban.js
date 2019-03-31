//Basic Command Template
import { cmd } from "../modules/functions.js";
export function run(client, message, [user, ...reason]) {
    if(message.guild.me.hasPermission("BAN_MEMBERS")){
    let guildid = `${message.guild.id}`;  
    let userperm = message.member.hasPermission("BAN_MEMBERS");  
    const member = message.mentions.members.first();
   async function ban(reason, member){
        try{             
                  
               if(!member){
                   return message.channel.send(`Please Try Again. I Can't Find ${user}`)
               }
               if(!reason){
                return message.channel.send("Please Specify a reason!");
            }
                members.ban(member);
            return message.channel.send(`Success! ${member} has been Banned`);
           } catch (error){
               return message.channel.send("Sorry I Can't Do That");
           }
        }     
               cmd('SELECT * FROM permoveride WHERE guildid ="' + guildid + '" and command = "ban"' , function(rows, fields) {
                               //Change command = "ping" to Command Name              
                const usersRows = JSON.parse(JSON.stringify(rows));
                var usrole = [];
                for(var k in usersRows) {                    
                    usrole.push(usersRows[k].role);
                 }                 if(usrole.length === 0){  
                     if(!userperm){
                         return message.channel.send("You Don't Have The Proper Permission To Do this!");
                     }else{
                        ban(member, reason);
                     }    
                 }else if(message.member.roles.some(r=> usrole.includes(r.name)) ) {
                     ban(member, reason);
                                   
                    } else {                         
                        return message.channel.send("You Shall Not Pass!");
                    
                  }
                });
            }
}

export const help = {
    //Update this Section
    name: "ban",
    category: "moderation",
    description: "Ban a user With reason of course",
    usage: "ban @user reason"
}