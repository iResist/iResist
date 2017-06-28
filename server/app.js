'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const app = express();

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
app.use('/api/tweets', routes.twitter);

module.exports = app;
