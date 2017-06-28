const express = require('express');
const router = express.Router();
const controllers = require('../controllers').Twitter;

app.get('/getTweet', controllers.getTweets);
