var express = require('express')
var app = express()

class WebsiteLoader {
  constructor () {
    this.loadWebsite(app)
  }
  loadWebsite (eapp) {
    app.use('/api/discord', require('./ExpressLoginRouter'))
    app.use((err, req, res, next) => {
      switch (err.message) {
        case 'NoCodeProvided':
          return res.status(400).send({
            status: 'ERROR',
            error: err.message,
          });
        default:
          return res.status(500).send({
            status: 'ERROR',
            error: err.message,
          });
      }
    });
    app.get('/', function (req, res) {
      console.log('Got a GET request on / > Sending HOME page');
      res.sendFile('/app/src/website/index.html')
    });
    app.get('/authSucess', function (req, res) {
      console.log('alguem se logou owo');
      res.sendFile('/app/src/website/authOk.html');          
    });
    app.get('/dashboard', function (req, res) {
      console.log("Got GET request on /dashboard > SENDING DASHBOARD PAG")
      res.sendFile('/app/src/website/dashboard.html')
    });
    app.get('/dashboard.html', function (req, res) {
      console.log("GOT GET REQUEST ON /dashboard.html > SENDING DASHBOARD PAG")
      res.sendFile('/app/src/website/dashboard.html')
    });
    app.get('/auth', function (req, res) {
      res.status(200).sendFile('/app/src/website/auth.html');
    });
    app.listen(process.env.PORT || 3000, function () {
      console.log("Website Listener is listing...");
    });
  }
}

module.exports = WebsiteLoader

// Now, we need export our express app to use it on DBL Webhook system
exports.app = app