/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
var { createCanvas, loadImage, Image, registerFont } = require("canvas");

var { get } = require("snekfetch");
var fs = require("fs");
require("./CanvasUtils").loadHelper();
var textApply = (canvas, text, tamanho, font, type, tamanh) => {
  var size = tamanh;
  if (!type) type = "";
  var contexto = canvas.getContext("2d");
  do {
    size -= 2;
    contexto.font = size +"px \""+ font+"\" "+ type;
  } while (contexto.measureText(text).width > tamanho);
  return contexto.font;
};

// não lembro de onde eu kibei, mas funciona
// nice
const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
  var words = text.split(" ")
    , line = ""
    , lines = [];
  
  for (var n = 0, len = words.length; n < len; n++) {
    var testLine = line + words[n] + " "
      , metrics = ctx.measureText(testLine)
      , testWidth = metrics.width;
  
    if (testWidth > maxWidth) {
      lines.push({ text: line, x: x, y: y });
      line = words[n] + " ";
      y += 10;
    } else {
      line = testLine;
    }
  }
  
  lines.push({ text: line, x: x, y: y });
  return lines;
};

/**
 * Desenha o texto com linebreaks no canvas
 * @param {Array} linhas - Retornado por wrapText()
*/
const drawWrappedText = (ctx, linhas) => {
  ctx.save();

  linhas.forEach(linha => {
    ctx.fillText(linha.text, linha.x, linha.y);
  });

  ctx.restore();
};

// ex
/*
  let linhas = wrapText(ctx, "oi tudo bem AOAOAAO AOA OA OA AOA OA", x, y, canvas.width, 32);
  drawWrappedText(ctx, linhas);
  
  testa aí
  ok
*/
// hora de reiniciar a Lunar e ver o negócio de carregar os resources deu certo
// ok, agora vou testar o break line
// Empty vars - The buffers will be loaded here
let firstWord;
let nnsei;
let laranjo;
let respect;
let prvideo;
let circuloBuffer;
let google;
let falso;
let xvideos;
let treta;
let praia;
let pfpr;
class CanvasCommands {
  static async loadResources() {
    registerFont("./src/fonts/Chivo_Black.ttf", { family: "Chivo Black" });
    registerFont("./src/fonts/Coolvetica.ttf", { family: "Coolvetica" });
    registerFont("./src/fonts/Roboto_Regular.ttf", { family: "Roboto", weight: "Regular" });
    // Let's try get the buffer from all resources to make this more faster
    try {
     
      falso = fs.readFileSync("./src/data/block.jpg", function(e) {});
      
      // praia = fs.readFileSync('/app/.data/weather.jpg', function (e) {});
      await get("http://data.1freewallpapers.com/download/scenery-sea-palm-trees-reflected-beach-desktop.jpg").then(async a => praia = await loadImage(a.body));
     
      circuloBuffer = fs.readFileSync("./src/data/circulo.jpg", function(e) {});
      pfpr = fs.readFileSync("./src/data/profile.png", function(e) {});
      console.log("Buffers loaded.");
    } catch (e) {
      console.error("barai", e);
      return "ERR! "+ e.message;
    }
    return "Sucess loading the buffers";
  }
 
  static async pfp(usr, usrDb) {
    var canvas = createCanvas(377, 102);
    var ctx = canvas.getContext("2d");
    var { body: usrBuffer } = await get(usr.displayAvatarURL);
    var img = await loadImage(usrBuffer);
    var { body: bgb } = await get(usrDb.background);
    var bg = await loadImage(bgb);
    //var pfp = await loadImage(pfpr);
    ctx.drawImage(bg, 0, 0);
    //ctx.drawImage(pfp, 0, 0);
    ctx.font = "10px \"Coolvetica\"";
    var linhas = wrapText(ctx, usrDb.sobremim, 244, 28, 150, 35);
    drawWrappedText(ctx, linhas);
    ctx.font = textApply(canvas, usr.username, 136, "Roboto", "Regular", 15);
    ctx.fillStyle = "#000000";
    ctx.fillText(usr.username, 22, 14);
    ctx.font = "30px \"Coolvetica\"";
    ctx.fillText("Balance", 34, 90);
    ctx.font = "30px \"Coolvetica\"";
    ctx.fillText(usrDb.money, 53, 68);
    
    ctx.roundImage(img, 139, 1, 101, 100);
    
    return canvas.toBuffer();
  }
  static async weather(obj) {
    var img = createCanvas(1920, 1080);
    var ctx = img.getContext("2d");
    
    ctx.drawImage(praia, 0, 0);
    ctx.font = "400px \"Coolvetica\"";
    ctx.fillStyle = "#000000";
    ctx.fillText(obj.current.temperature, 1250, 950);
    
    ctx.font = "90px \"Coolvetica\"";
    ctx.fillText(obj.location.degreetype +"°", 1623, 770);
    
    ctx.font = "90px \"Coolvetica\"";
    ctx.fillText("Info for "+ obj.current.observationpoint, 500, 100);
    
    ctx.font = "70px \"Coolvetica\"";
    ctx.fillText("Thermical Sensation: "+ obj.current.feelslike +" "+ obj.location.degreetype +"°", 20, 1020);
    ctx.fillText("Wind MPH: "+ obj.current.winddisplay, 20, 950);
    ctx.fillText("Air humidity: "+ obj.current.humidity +"%", 20, 880);
    
    return img.toBuffer();
  }
  static async falso(avatar) {
    var canvas = createCanvas(300, 300);
    var { body: imgBu } = await get(avatar);
    var img = await loadImage(imgBu);
    var src = await loadImage(falso);
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, 300, 300);
    ctx.drawImage(src, 0, 0);
    

    ctx.font = "85px \"Roboto\" Black";
    ctx.fillStyle = "#000000";
    ctx.fillText("BLOCKED", 20, 175);
    
    ctx.font = "80px \"Roboto\" Black";
    ctx.fillStyle = "#ff0000";
    ctx.fillText("BLOCKED", 35, 175);
    
    return canvas.toBuffer();
  }
  static async welcomer(user) {
    var canvas = createCanvas(800, 200);
    var contexto = canvas.getContext("2d");
    var avatarBuffer = await get(user.user.displayAvatarURL);
    var avatar = await loadImage(avatarBuffer);
    contexto.font = textApply(canvas, user.user.username, 750, "Roboto", "Regular", 70);
    contexto.fillStyle = "#ffffff";
    contexto.fillText(user.user.username, 400, 160);
    
    contexto.font = textApply(canvas, user.guild.name + 100, 580, "sans", "serif", 50);
    contexto.fillStyle = "#ffffff";
    contexto.fillText("Welcome to "+ user.guild.name +", ");
  
    contexto.roundImage(avatar, 10, 30, 200, 200);
    
    return canvas.toBuffer();
  }
  static async ship(percent, avatar1, avatar2) {
    var { body: avatar1b } = await get(avatar1);
    var img1 = await loadImage(avatar1b);
    var circulo = await loadImage(circuloBuffer);
    var { body: avatar2b } = await get(avatar2);
    var img2 = await loadImage(avatar2b);
    var canvas = createCanvas(1000, 400);
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img1, 0, 0, 400, 400);
    ctx.drawImage(img2, 600, 0, 400, 400);
    ctx.drawImage(circulo, 350, 45, 300, 300);
    
    ctx.font = "70px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(percent +"%", 396, 210);
    
    return canvas.toBuffer();
  }
  
}

module.exports = CanvasCommands;