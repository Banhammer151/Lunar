const express = require('express');
const app = express()
const helmet = require('helmet')
var https = require('https');
var fs = require('fs');
var config = require('./config.json');
session = require('express-session'),
FileStore = require('session-file-store')(session);
app.use(helmet())
app.use(session({
 
    // using FileStore with express-session
    // as the sore method, replacing the default memory store
    store: new FileStore({

        path: './session-store'

    }),
    name: 'LunarLabs', // cookie will show up as foo site
    secret: "lhsglhsdkfglskd",
    resave: false,
    saveUninitialized: false,
    cookie: {
        // five year cookie
        maxAge: 1000 * 60 * 60 * 24 * 365 * 5
    }
}));
app.use(function(req, res, next) {
    res.locals.user = req.session.userdata;
    res.locals.guilds = req.session.guilddata;
    next();
  });
const oAuthClient = require('disco-oauth');
const client = new oAuthClient(
    config.clientId,               // The Client ID
     config.clientSecret           // The Client Secret
) // Initiate the client.
app.set('view engine', 'ejs');
client.setScopes(['identify','guilds'])             // Set the scopes
client.setRedirect('https://lunar-labs.dev:443/login') // Set the redirect URI
let port = config.port || 3000;
app.set('port', port);

app.get('/', (req, res)=>{
    if(!req.session.userdata){
    const loginlink = `${client.getAuthCodeLink()}`;
    res.render('pages/index', {login:loginlink, link: "Login"});
    }else{
        res.render('pages/index', {login: '/logout', link: "Logout", username: req.session.userdata.username + "#"+req.session.userdata.discriminator})
    }   
});
app.get('/about', function(req, res){
    res.render('pages/about');
    });
app.get('/login', async (req, res)=>{
    let code = req.query.code;
    try{
        let key = await client.getAccess(code) // Gets the access token
        var userdata = req.session.userdata;
        req.session.userdata = await client.getAuthorizedUser(key);
        //console.log(client.getAccessObject(key))    // Get the access token response (really not recommended)

        //console.log(await client.getAuthorizedUser(key)) // Gets /users/@me (will log in console)
        //res.send(await client.getAuthorizedUserGuilds(key))  // Gets /users/@me/guilds (shows in browser) (pretty ugly)
        
        
        req.session.guilddata = await client.getAuthorizedUserGuilds(key);
        res.redirect("home")
    }
    catch(error){
        console.log(error)
    }
});
app.get('/home', async (req, res)=>{
    if(!req.session.guilddata){
        res.redirect('/login');
    }else{    
    res.render('pages/home.ejs',{user: req.session.userdata, guilds: req.session.guilddata, login: '/logout', link: "Logout", username:req.session.userdata.username + "#"+req.session.userdata.discriminator})
    //res.send(req.session.guilddata);
    }
});
app.get('/logout', async (req, res)=>{
    req.session.destroy(function(err) {
        res.redirect('/');
      })
    
});
https.createServer({
    key: fs.readFileSync('encryption/private.key'),
    cert: fs.readFileSync('encryption/lunar-labs_dev.crt')
  }, app)
  .listen(port, () => console.info(`Listening on port ${port}`));