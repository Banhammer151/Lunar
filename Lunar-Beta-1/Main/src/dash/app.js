const express = require('express');
const app = express();
const helmet = require('helmet');
const https = require('https');
const fs = require('fs');
const config = require('./config.json');
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: config.mysqlh,
	user: config.mysqlu,
	password: config.mysqlp, database: config.mysqldb, port:config.mysqlpor });
const session = require('express-session');
const FileStore = require('session-file-store')(session);
app.use(helmet());
app.use(session({

	// using FileStore with express-session
	// as the sore method, replacing the default memory store
	store: new FileStore({

		path: './session-store',

	}),
	name: 'LunarLabs',
	secret: 'lhsglhsdkfglskd',
	resave: false,
	saveUninitialized: false,
	cookie: {
		// five year cookie
		maxAge: 1000 * 60 * 60 * 24 * 365 * 5,
	},
}));
app.use('/static', express.static('public'));
app.use(function(req, res, next) {
	res.locals.user = req.session.userdata;
	res.locals.guilds = req.session.guilddata;
	next();
});
const oAuthClient = require('disco-oauth');
const client = new oAuthClient(
	config.clientId,
	config.clientSecret
);
app.set('view engine', 'ejs');
client.setScopes(['identify', 'guilds']);
client.setRedirect('https://lunar-labs.dev:443/login');
const port = config.port || 3000;
app.set('port', port);

app.get('/', (req, res)=>{
	if(!req.session.userdata) {
		const loginlink = `${client.getAuthCodeLink()}`;
		res.render('pages/index', { login:loginlink, link: 'Login' });
	}
	else{
		res.render('pages/index', { login: '/logout', link: 'Logout', username: req.session.userdata.username + '#' + req.session.userdata.discriminator });
	}
});
app.get('/about', function(req, res) {
	res.render('pages/about');
});
app.get('/manage/:tagId', function(req, res) {

	connection.connect();
	// eslint-disable-next-line no-unused-vars
	connection.query(`SELECT * FROM guilds WHERE guildid=${req.params.tagId}`, function(err, rows, fields) {
		if (err) throw err;
		res.send('Guild ID is ' + rows[0].guildid);

	});
	connection.end();
});
app.get('/login', async (req, res)=>{
	const code = req.query.code;
	try{
		const key = await client.getAccess(code);
		// eslint-disable-next-line no-unused-vars
		const userdata = req.session.userdata;
		req.session.userdata = await client.getAuthorizedUser(key);
		req.session.guilddata = await client.getAuthorizedUserGuilds(key);
		res.redirect('home');
	}
	catch(error) {
		console.log(error);
	}
});
app.get('/home', async (req, res)=>{
	if(!req.session.guilddata) {
		res.redirect('/login');
	}
	else{
		res.render('pages/home.ejs', { user: req.session.userdata, guilds: req.session.guilddata, login: '/logout', link: 'Logout', username:req.session.userdata.username + '#' + req.session.userdata.discriminator });
		// res.send(req.session.guilddata);
	}
});
app.get('/logout', async (req, res)=>{
	// eslint-disable-next-line no-unused-vars
	req.session.destroy(function(err) {
		res.redirect('/');
	});

});
https.createServer({
	key: fs.readFileSync('encryption/private.key'),
	cert: fs.readFileSync('encryption/lunar-labs_dev.crt'),
}, app)
	.listen(port, () => console.info(`Listening on port ${port}`));