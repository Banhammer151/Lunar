//Basic Command Template
import { cmd } from "../modules/functions.js";
export async function run(client, message, args) {
    if(message.guild.me.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")){
    let guildid = `${message.guild.id}`;  
    if(message.guild.me.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")){
        let guildid = `${message.guild.id}`;  
        const logs = message.guild.channels.find(channel => channel.name === "lunar-logs");
        if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
            message.guild.channels.create('lunar-logs', 'text');
          }
          if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) { 
            console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions')
          } 
    let userperm = message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");     
               cmd('SELECT * FROM permoveride WHERE guildid ="' + guildid + '" and command = "createrole"' , function(rows, fields) {
                               //Change command = "ping" to Command Name              
                const usersRows = JSON.parse(JSON.stringify(rows));
                var usrole = [];
                for(var k in usersRows) {                    
                    usrole.push(usersRows[k].role);
                 }                 if(usrole.length === 0){  
                     if(!userperm){
                         return message.channel.send("You Don't Have The Proper Permission To Do this!");
                     }else{
                        try {
                                let userrole = args.join(' ');
                                
                                message.guild.roles.create({
                                    data:{
                                    name: `${userrole}`,
                                    } 
                                  })
                                    .then(role => {                                    
                                    message.guild.channels.find(channel => channel.name === "lunar-logs").send({embed: {
                                        color: 3447003,
                                        author: {
                                          name: message.member.user.tag,
                                          icon_url: message.member.user.avatarURL
                                        },
                                        title: "Success",
                                       
                                        description: `Successfully Created ${role.name}`,
                                        
                                        timestamp: new Date(),
                                        footer: {
                                          icon_url: client.user.avatarURL,
                                          text: "© Lunar Beta"
                                        }
                                      }
                                    });
            
                                 }
                                   )
                                             .catch(console.error)
                             
                            } catch (error){
                                return message.channel.send("Oops Try Again!");
                            }
                     }    
                 }else if(message.member.roles.some(r=> usrole.includes(r.name)) ) { 
                     try{                  
                        let userrole = args.join(' ');
                        let color = args[1];
                        message.guild.roles.create({
                            name: `${userrole}`,
                            
                          })
                            .then(role =>  {                                    
                                message.guild.channels.find(channel => channel.name === "lunar-logs").send({embed: {
                                    color: 3447003,
                                    author: {
                                      name: message.member.user.tag,
                                      icon_url: message.member.user.avatarURL
                                    },
                                    title: "Success",
                                   
                                    description: `Successfully Created ${role.name}`,
                                    
                                    timestamp: new Date(),
                                    footer: {
                                      icon_url: client.user.avatarURL,
                                      text: "© Lunar Beta"
                                    }
                                  }
                                });
        
                             }
                               )
                                         .catch(console.error)
                    } catch (error){
                        return message.channel.send("Oops Try Again!");
                    }
                     
                    } else {  

                       
                        return message.channel.send("You Shall Not Pass!");
                    
                  }
                });
            }
}
}
export const help = {
    //Update this Section
    name: "createrole",
    category: "moderation",
    description: "create a role with everyone permission",
    usage: "createrole rolename"
}