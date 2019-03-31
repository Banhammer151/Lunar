//Basic Command Template
import { cmd } from "../modules/functions.js";
export async function run(client, message, [user, ...rolename]) {
    if(message.guild.me.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")){
    let guildid = `${message.guild.id}`;  
    let userperm = message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");     
               cmd('SELECT * FROM permoveride WHERE guildid ="' + guildid + '" and command = "removerole"' , function(rows, fields) {
                               //Change command = "ping" to Command Name              
                const usersRows = JSON.parse(JSON.stringify(rows));
                var usrole = [];
                for(var k in usersRows) {                    
                    usrole.push(usersRows[k].role);
                 }                 if(usrole.length === 0){  
                     if(!userperm){
                         return message.channel.send("You Don't Have The Proper Permission To Do this!");
                     }else{
                                const member =  message.mentions.members.first();
                                const role = message.guild.roles.find(r => r.name === `${rolename}`);
                                if(!role){
                                    return message.channel.send("That Role Doesn't Exist!");
                                }
                                if(!member){
                                    return message.channel.send(`Please Try Again. I Can't Find ${user}`)
                                }
                                 member.roles.remove(role);
                             return message.channel.send("Success!");
                     }    
                 }else if(message.member.roles.some(r=> usrole.includes(r.name)) ) {                   
                     
                    const member =  message.mentions.members.first();
                    const role = message.guild.roles.find(r => r.name === `${rolename}`);
                    if(!role){
                        return message.channel.send("That Role Doesn't Exist!");
                    }
                    if(!member){
                        return message.channel.send(`Please Try Again. I Can't Find ${user}`)
                    }                    
                     member.roles.remove(role);
                     return message.channel.send("Success!");
                    } else {  

                       
                        return message.channel.send("You Shall Not Pass!");
                    
                  }
                });
            }
}
export const help = {
    //Update this Section
    name: "removerole",
    category: "misc",
    description: "remove roles from a user",
    usage: "removerole @user role"
}