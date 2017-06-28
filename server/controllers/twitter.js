const Twitter = require('twitter');
const Twit = require('twit');

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

if (process.env.TWITTER_ACCESS_TOKEN_SECRET) {
  twitterAccessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;
} else {
  twitterAccessTokenSecret = creds.twitterAccessTokenSecret;
}

var T = new Twit({
  consumer_key: twitterKey,
  consumer_secret: twitterSecret,
  access_token: twitterAccessToken,
  access_token_secret: twitterAccessTokenSecret,
  timeout_ms: 60 * 1000
});

module.exports.getTweets = (req, res) => {
  T.get('search/tweets', { q: req.query.searchTerm, count: 100 }, function(err, data, response) {
    if (err) {
      console.log(err);
    } else {
      res.send(data.statuses);
    }
  });
};
