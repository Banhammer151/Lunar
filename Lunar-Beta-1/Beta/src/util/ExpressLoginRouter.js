const express = require('express');
const catchAsync = fn => (
  (req, res, next) => {
    const routePromise = fn(req, res, next);
    if (routePromise.catch) {
      routePromise.catch(err => next(err));
    }
  }
);
const router = express.Router();
const fetch = require('node-fetch');
var snek = require('snekfetch')
const btoa = require('btoa');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const redirect = 'http://kanori.glitch.me/api/discord/callback'

router.get('/login', async (req, res) => {
  res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`);
});

router.get('/callback', catchAsync(async (req, res) => {
  if (!req.query.code) throw new Error('NoCodeProvided');
  const code = req.query.code;
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${creds}`,
      },
    });
  const json = await response.json();
  const userResp = await fetch(`http://discordapp.com/api/users/@me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${json.access_token}`
    },
  });
  var user = await userResp.json()
  
  console.log(user.username +"#"+ user.discriminator +" with id "+ user.id +" logged on website!")
  res.redirect(`/authSucess`);
}));

module.exports = router;