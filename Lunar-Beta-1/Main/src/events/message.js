var con = require("../modules/functions.js");
module.exports = async (client, message) => {
  if (message.channel.type == "dm") return;
  // Ignore all bots
  let guildid = `${message.guild.id}`;
  con.select('SELECT EXISTS( SELECT 1 FROM guilds WHERE "' + guildid + '")', function (error, rows) {
    if (error) {
      //console.log(error);
    }else{
        if (rows && rows.length ) {
            //console.log('Yay');
            // do something with your row variable
        } else {
            //console.log('No case row was found :( !');
            let guildid = `${message.guild.id}`;
            let guildname = `${message.guild.name}`;
            let guildcreatedAt = `${message.guild.createdAt}`;
            let guildownerID = `${message.guild.ownerID}`;
            let guildowner = `${message.guild.owner}`;
            client.guildjoinadd(guildid, guildname, guildcreatedAt, guildownerID, guildowner);
        }    
      }   
  });
  if (message.author.bot) return;
    // if(message.guild){
    //   con.select('SELECT * FROM guild-level WHERE `user`="'+message.users.id+'and `guildid` ='+ message.guild.id, function(error, rows){
    //     if(!rows){
    //       try{

    //       }
    //     }
    //   });
    // }

  con.select('SELECT prefix FROM guilds WHERE `guildid`="' + guildid + '"', function (rows) {

    const prefix = `${rows[0].prefix}`;
    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(prefix) !== 0) return;

    // Our standard argument/command name definition.
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    // Run the command
    cmd.run(client, message, args);


  });


};