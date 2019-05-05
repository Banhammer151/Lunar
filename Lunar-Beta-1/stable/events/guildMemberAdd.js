// This event executes when a new member joins a server. Let's welcome them!
/* eslint-disable linebreak-style */
module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.getSettings(member.guild);
  if (settings.welcomeEnabled !== "true") return;
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);
  member.guild.channels.find(channel => channel.name === settings.welcomeChannel).send(welcomeMessage).catch(console.error);
  
  if (settings.autorole1EN === "true") {
    const role = member.guild.roles.find(r => r.name === settings.autorole1);
    member.addRole(role).then(() => {
      if (settings.autorole2EN === "true") {
        const role2 = member.guild.roles.find(r => r.name === settings.autorole2);
        member.addRole(role2).catch(console.error);
      }
    }).then(()=>{
      if (settings.autorole3EN === "true") {
        const role3 = member.guild.roles.find(r => r.name === settings.autorole3);
        member.addRole(role3).catch(console.error);
      }
    }).catch(error => {
      console.log(error);
    });
  }
    

  


  
  

  

  
 
};
