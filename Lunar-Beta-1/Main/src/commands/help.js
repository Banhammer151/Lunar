//Basic Command Template
const fs = require("fs");
var Table = require('easy-table')
export async function run(client, message, args) {
//     var commands = [];
    

// var arrayOfFiles = fs.readdirSync('./src/commands');

// //Yes, the following is not super-smart, but you might want to process the files. This is how:
// arrayOfFiles.forEach( function (file) {
//     if (!file.endsWith(".js")) return;
//     let props = require(`./${file}`);
//     let name = props.help.name;
//     let des = props.help.description;
//     let usea = props.help.usage;
//     let category = props.help.category;
//     commands.push({
//         command: name,
//         description: des,
//         usage: usea,
//         category: category
//     });
    
   
// });
// var t = new Table
// commands.forEach(function(product) {
//     t.cell('Command', `| ${product.command} |`)
//     t.cell('Description', `| ${product.description} |`)
//     t.cell('Usage', `| ${product.usage} |`)
//     t.cell('category', `| ${product.category} |`)
//     t.sort('category|asc')
//     t.newRow()
//   })
//   console.log(t.toString())
  
//   message.channel.send(`${t.toString()}`, {code: [js]});
if (!args[0]) {
    // Load guild settings (for prefixes and eventually per-guild tweaks)
  

    // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
    const myCommands = client.commands;

    // Here we have to get the command names only, and we use that array to get the longest name.
    // This make the help commands "aligned" in the output.
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let currentCategory = "";
    let output = `= Command List =\n\n[Use help <commandname> for details]\n`;
    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
    sorted.forEach( c => {
      const cat = c.help.category;
      if (currentCategory !== cat) {
        output += `\n== ${cat} ==\n`;
        currentCategory = cat;
      }      
      output += `${c.help.name}${" ".repeat(longest - c.help.name.length)}:: ${c.help.description}\n`;
    });
    
      
      message.author.send(output, {code:"asciidoc", split:"true"}).then(message => console.log("Help Command Used!")).catch(console.error);
      message.channel.send("Help is on the way!").then(message => message.edit("Help Sent!")).catch(console.error);
    
  } else {
    // Show individual command's help.
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);      
      message.author.send(`= ${command.help.name} = \n${command.help.description}\nusage::${command.help.usage}`, {code:"asciidoc"});
    }
  }

}


export const help = {
    name: "help",
    category: "system",
    description: "Help Command",
    usage: "help"
}