var { createCanvas, loadImage, Image, registerFont } = require('canvas');

var { get } = require('snekfetch');
var fs = require('fs');
require('./CanvasUtils').loadHelper()
var textApply = (canvas, text, tamanho, font, type, tamanh) => {
  var size = tamanh;
  if (!type) type = "";
  var contexto = canvas.getContext('2d');
  do {
    size -= 2;
    contexto.font = size +'px "'+ font+'" '+ type;
  } while (contexto.measureText(text).width > tamanho)
    return contexto.font
}

// não lembro de onde eu kibei, mas funciona
// nice
const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
    var words = text.split(' ')
      , line = ''
      , lines = [];
  
    for(var n = 0, len = words.length; n < len; n++){
      var testLine = line + words[n] + ' '
        , metrics = ctx.measureText(testLine)
        , testWidth = metrics.width;
  
      if (testWidth > maxWidth) {
        lines.push({ text: line, x: x, y: y });
        line = words[n] + ' ';
        y += 10
      } else {
        line = testLine;
      }
    }
  
    lines.push({ text: line, x: x, y: y });
    return lines;
}

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
}

// ex
/*
  let linhas = wrapText(ctx, "oi tudo bem AOAOAAO AOA OA OA AOA OA", x, y, canvas.width, 32);
  drawWrappedText(ctx, linhas);
  
  testa aí
  ok
*/
// hora de reiniciar a kanori e ver o negócio de carregar os resources deu certo
// ok, agora vou testar o break line
// Empty vars - The buffers will be loaded here
let firstWord;
let nnsei;
let laranjo;
let respect;
let prvideo;
let circuloBuffer;
let google;
let falso
let xvideos
let treta
let praia
let pfpr
class CanvasCommands {
  static async loadResources () {
    registerFont('./src/fonts/Chivo_Black.ttf', { family: "Chivo Black" });
    registerFont('./src/fonts/Coolvetica.ttf', { family: "Coolvetica" });
    registerFont('./src/fonts/Roboto_Regular.ttf', { family: "Roboto", weight: "Regular" });
    // Let's try get the buffer from all resources to make this more faster
    try {
      firstWord = fs.readFileSync('/app/.data/firstword.jpg', function(e) {});
      nnsei = fs.readFileSync('/app/.data/nnsei.jpg', function (e) {});
      laranjo = fs.readFileSync('/app/.data/laranjo.jpg', function (e) {});
      respect = fs.readFileSync('/app/.data/respect.jpg', function (e) {});
      prvideo = fs.readFileSync('/app/.data/pr.jpg', function (e) {});
      falso = fs.readFileSync('/app/.data/block.jpg', function (e) {});
      treta = fs.readFileSync('/app/.data/treta.jpg', function (e) {});
     // praia = fs.readFileSync('/app/.data/weather.jpg', function (e) {});
      await get('http://data.1freewallpapers.com/download/scenery-sea-palm-trees-reflected-beach-desktop.jpg').then(async a => praia = await loadImage(a.body));
      google = fs.readFileSync('/app/.data/google.jpg', function (e) {});
      xvideos = fs.readFileSync('/app/.data/xvideos.jpg', function (e) {});
      circuloBuffer = fs.readFileSync('/app/.data/circulo.jpg', function (e) {});
      pfpr = fs.readFileSync('/app/.data/profile.png', function (e) {});
      console.log("Buffers loaded.");
    } catch (e) {
      console.error("barai", e);
      return "ERR! "+ e.message
    }
    return "Sucess loading the buffers";
  }
  static async tretanews (phase) {
    var camelo = createCanvas(1479, 1080)
    var xxxtentacion = camelo.getContext('2d')
    var fluffy = await loadImage(treta)
    xxxtentacion.drawImage(fluffy, 0, 0)
    
    xxxtentacion.font = '40px "Roboto" Black'
    xxxtentacion.fillStyle = "#00000"
    xxxtentacion.fillText(phase, 15, 890)
    
    return camelo.toBuffer()
  }
  static async pfp (usr, usrDb) {
    var canvas = createCanvas(377, 102)
    var ctx = canvas.getContext('2d')
    var { body: usrBuffer } = await get(usr.displayAvatarURL)
    var img = await loadImage(usrBuffer)
    var { body: bgb } = await get(usrDb.background)
    var bg = await loadImage(bgb)
    var pfp = await loadImage(pfpr)
    ctx.drawImage(bg, 0, 0)
    ctx.drawImage(pfp, 0, 0)
    ctx.font = '10px "Coolvetica"'
    var linhas = wrapText(ctx, usrDb.sobremim, 244, 28, 150, 35)
    drawWrappedText(ctx, linhas)
    ctx.font = textApply(canvas, usr.username, 136, "Roboto", "Regular", 15)
    ctx.fillStyle = "#000000"
    ctx.fillText(usr.username, 22, 14)
    ctx.font = '30px "Coolvetica"'
    ctx.fillText("Balance", 34, 90)
    ctx.font = '30px "Coolvetica"'
    ctx.fillText(usrDb.money, 53, 68)
    
    ctx.roundImage(img, 139, 1, 101, 100)
    
    return canvas.toBuffer()
  }
  static async weather (obj) {
    var img = createCanvas(1920, 1080)
    var ctx = img.getContext('2d')
    
    ctx.drawImage(praia, 0, 0)
    ctx.font = '400px "Coolvetica"'
    ctx.fillStyle = "#000000"
    ctx.filText(obj.current.temperature, 1250, 950)
    
    ctx.font = '90px "Coolvetica"'
    ctx.fillText(obj.location.degreetype +"°", 1623, 770)
    
    ctx.font = '90px "Coolvetica"'
    ctx.fillText("Info for "+ obj.current.observationpoint, 900, 100)
    
    ctx.font = '70px "Coolvetica"'
    ctx.fillText("Thermical Sensation: "+ obj.current.feelslike +" "+ obj.location.degreetype +"°", 20, 1020)
    ctx.fillText("Wind KM/h: "+ obj.current.winddisplay, 20, 950)
    ctx.fillText("Air humidity: "+ obj.current.humidity +"%", 20, 880)
    
    return img.toBuffer()
  }
  static async firstWord (phase) {
    var firstImg = await loadImage(firstWord); // <- ele tá reclamando disso aq
    var canvas = createCanvas(453, 473);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(firstImg, 0, 0);
    
    ctx.font = "20px sans-serif" // <- nesse caso, line height seria 20px (tamanho da fonte)
    // mas ai mexeria na letra no 1 33
    // o que aplica a frase é ali em baixo
    ctx.fillStyle = "#000000";
    // deu erro, nice
    ctx.fillText(phase.split("")[0], 1, 33);
    ctx.fillText(phase.split("")[0], 44, 33);
    
    ctx.font = textApply(canvas, phase, 310, "Roboto", "Regular", 20)
    ctx.fillText(phase, 10, 340)
    
    return canvas.toBuffer()
  }
  static async falso (avatar) {
    var canvas = createCanvas(300, 300)
    var { body: imgBu } = await get(avatar)
    var img = await loadImage(imgBu)
    var src = await loadImage(falso)
    var ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, 300, 300)
    ctx.drawImage(src, 0, 0)
    

    ctx.font = '85px "Roboto" Black'
    ctx.fillStyle = "#000000"
    ctx.fillText("FALSO", 20, 175)
    
    ctx.font = '80px "Roboto" Black'
    ctx.fillStyle = "#ff0000"
    ctx.fillText("FALSO", 35, 175)
    
    return canvas.toBuffer()
  }
  static async welcomer (user) {
    var canvas = createCanvas(800, 200)
    var contexto = canvas.getContext('2d')
    var avatarBuffer = await get(user.user.displayAvatarURL)
    var avatar = await loadImage(avatarBuffer)
    contexto.font = textApply(canvas, user.user.username, 750, "Roboto", "Regular", 70)
    contexto.fillStyle = "#ffffff"
    contexto.fillText(user.user.username, 400, 160)
    
    contexto.font = textApply(canvas, user.guild.name + 100, 580, "sans", "serif", 50)
    contexto.fillStyle = "#ffffff"
    contexto.fillText("Welcome to "+ user.guild.name +", ")
  
    contexto.roundImage(avatar, 10, 30, 200, 200)
    
    return canvas.toBuffer()
  }
  static async xvideos (text, imageurl) {
    var canvas = createCanvas(1513, 1080)
    var ctx = canvas.getContext('2d')
    var src = await loadImage(xvideos)
    var { body: image } = await get(imageurl)
    var img = await loadImage(image)
    ctx.drawImage(src, 0, 0)
    ctx.font = '50px "Roboto" Black'
    ctx.fillStyle = "#000000"
    ctx.fillText(text, 30, 213)
    
    ctx.drawImage(img, 28, 270, 1456, 689)
    
    return canvas.toBuffer()
  }
  static async ship (percent, avatar1, avatar2) {
    var { body: avatar1b } = await get(avatar1);
    var img1 = await loadImage(avatar1b);
    var circulo = await loadImage(circuloBuffer);
    var { body: avatar2b } = await get(avatar2);
    var img2 = await loadImage(avatar2b);
    var canvas = createCanvas(1000, 400);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img1, 0, 0, 400, 400)
    ctx.drawImage(img2, 600, 0, 400, 400);
    ctx.drawImage(circulo, 350, 45, 300, 300);
    
    ctx.font = "70px sans-serif";
    ctx.fillStyle = "#FF0000"
    ctx.fillText(percent +"%", 396, 210);
    
    return canvas.toBuffer()
  }
  static async fakePrVideo (phase) {
    var canvas = createCanvas(455, 100);
    var ctx = canvas.getContext('2d');
    var img = await loadImage(prvideo);
    ctx.drawImage(img, 0, 0)
    ctx.font = textApply(canvas, phase, canvas.width - 30, "Roboto", "Regular", 17)
    ctx.fillStyle = "#000000"
    ctx.fillText(phase, 120, 55)
    
    return canvas.toBuffer();
  }
  static async nsei(phase) {
    var nseiImage = await loadImage(nnsei);
    var canvas = createCanvas(600, 288)
    var ctx = canvas.getContext('2d');
    ctx.drawImage(nseiImage, 0, 0)
    ctx.font = textApply(canvas, phase, 600, "sans-serif", "", 25)
    ctx.fillStyle = "#000000"
    ctx.fillText(phase, 6, 23);
    return canvas.toBuffer()
  }
  static async googleIt(phase) {
    var canvas = createCanvas(1024, 512)
    var ctx = canvas.getContext('2d');
    var img = await loadImage(google)
    ctx.drawImage(img, 0, 0)
    ctx.font = textApply(canvas, phase, canvas.width - 200, "Roboto", "Regular", 50)
    ctx.fillStyle = "#000000"
    ctx.fillText(phase, 35, 415)
    
    return canvas.toBuffer()
  }
  static async respect(url) {
    var img = createCanvas(1920, 1080);
    var ctx = img.getContext('2d');
    var { body: avatarBuffer } = await get(url);
    
    var avatarCanvas = createCanvas(800, 800);
    var avatarContext = avatarCanvas.getContext("2d");
    var avatarImage = await loadImage(avatarBuffer);
    
    var image = avatarImage
    var imgFull = await loadImage(respect);
    
    ctx.drawImage(imgFull, 0, 0);
    
    ctx.drawImage(image, 935, 85, 150, 200);
    
    return img.toBuffer()
  }
  static async laranjo(phase) {
    var laranjoImg = await loadImage(laranjo);
    var canvas = createCanvas(1683, 1080)
    var ctx = canvas.getContext('2d');
    ctx.drawImage(laranjoImg, 0, 0);
    
    ctx.font = textApply(canvas, phase, 1070, "Chiva Black", "", 80);
    ctx.fillStyle = "#000000";
    ctx.fillText(phase, 50, 100)
    
    return canvas.toBuffer()
  }
}

module.exports = CanvasCommands