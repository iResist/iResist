const express = require('express');
const router = express.Router();
const controllers = require('../controllers').Twitter;

router.get('/', controllers.getTweets);

module.exports = router;
