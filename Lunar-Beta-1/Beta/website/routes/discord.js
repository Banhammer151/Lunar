const router = require("express").Router();

//const { clientId, clientSecret, scopes, redirectUri } = require("../config.json");
require("custom-env").env("dev");
const fetch = require("node-fetch");
const FormData = require("form-data");
const scopes = ["identify", "guilds"];
const forceAuth = (req, res, next) => {
  if (!req.session.user) return res.redirect("/authorize");
  else return next();
};

router.get("/", (req, res) => {
  if (req.session.user) return res.redirect("/");

  const authorizeUrl = `https://discordapp.com/api/oauth2/authorize?client_id=${process.env.CLIENTID}&redirect_uri=${encodeURIComponent(process.env.REDIRECTURI)}&response_type=code&scope=${scopes.join("%20")}`;
  res.redirect(authorizeUrl);
});

router.get("/callback", (req, res) => {
  if (req.session.user) return res.redirect("/");
    
  const accessCode = req.query.code;
  if (!accessCode) throw new Error("No access code returned frm Discord");

  const data = new FormData();
  data.append("client_id", process.env.CLIENTID);
  data.append("client_secret", process.env.CLIENTSECRET);
  data.append("grant_type", "authorization_code");
  data.append("redirect_uri", process.env.REDIRECTURI);
  data.append("scope", scopes.join(" "));
  data.append("code", accessCode);

  fetch("https://discordapp.com/api/oauth2/token", {
    method: "POST",
    body: data
  })
    .then(res => res.json())
    .then(response => {
      fetch("https://discordapp.com/api/users/@me", {
        method: "GET",
        headers: {
          authorization: `${response.token_type} ${response.access_token}`
        },
      })
        .then(res2 => res2.json())
        .then(userResponse => {
          userResponse.tag = `${userResponse.username}#${userResponse.discriminator}`;
          userResponse.avatarURL = userResponse.avatar ? `https://cdn.discordapp.com/avatars/${userResponse.id}/${userResponse.avatar}.png?size=1024` : null;

          req.session.user = userResponse;
          res.redirect("/");
        });
    });
});

// eslint-disable-next-line no-unused-vars
router.get("/logout", forceAuth, (req, res) => {
  req.session.destroy();
});

module.exports = router;