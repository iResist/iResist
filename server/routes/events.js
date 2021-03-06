const express = require('express');
const router = express.Router();
const controllers = require('../controllers').Events;

router.post('/create', controllers.createEvent);
router.post('/join', controllers.joinEvent);
router.post('/leave', controllers.leaveEvent);
router.get('/getAllEvents', controllers.getAllEvents);
router.get('/all', controllers.getAllEvents);
router.post('/update', controllers.updateEvent);
router.delete('/delete', controllers.deleteEvent);
router.get('/users', controllers.getAllUsersForEvent);

module.exports = router;
