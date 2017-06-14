'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const io = require('socket.io');
const Twitter = require('twitter');
const Twit = require('twit');
const app = express();

try {
  const creds = require('../config/configVars');
} catch (e) {
}

let twitterKey;
let twitterSecret;
let twitterAccessToken;
let twitterAccessTokenSecret;
if (process.env.TWITTER_KEY) {
  twitterKey = process.env.TWITTER_KEY;
} else {
  twitterKey = creds.twitterKey;
}

if (process.env.TWITTER_SECRET) {
  twitterSecret = process.env.TWITTER_SECRET;
} else {
  twitterSecret = creds.twitterSecret;
}

if (process.env.TWITTER_ACCESS_TOKEN) {
  twitterAccessToken = process.env.TWITTER_ACCESS_TOKEN;
} else {
  twitterAccessToken = creds.twitterAccessToken;
}

if(process.env.TWITTER_ACCESS_TOKEN_SECRET) {
  twitterAccessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;
} else {
  twitterAccessTokenSecret = creds.twitterAccessTokenSecret;
}

var T = new Twit({
    consumer_key: twitterKey,
    consumer_secret: twitterSecret,
    access_token: twitterAccessToken,
    access_token_secret: twitterAccessTokenSecret,
    timeout_ms: 60*1000
});

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes.auth);
app.use('/api', routes.api);
app.use('/api/dashboard', routes.dashboard);
app.use('/api/events', routes.events);
app.use('/api/profiles', routes.profiles);
app.use('/api/geocoder', routes.geocoder);
app.use('/api/user', routes.user);
app.use('/api/maps', routes.maps);
app.use('/api/feed', routes.feed);


app.get('/getTweet', function (req, res) {
  console.log('here is req: ', req.query.searchTerm);
  T.get('search/tweets', { q: req.query.searchTerm, count: 100 }, function(err, data, response) {
    if (err) {
      console.log(err);
    } else {
      res.send(data.statuses);
    }
  })
})


module.exports = app;
