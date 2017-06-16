const models = require('../../db/models');
const formatEvents = require('../../db/lib/formatEvents');
const formatUsers = require('../../db/lib/formatUsers');

module.exports.createEvent = (req, res) => {
  models.Events.createEvent(req.body, (err, data) => {
    if (err) {
      res.send(500, err);
    } else {
      models.User.createEvent(data[0], req.body.userId, (err, data) => {
        if (err) {
          res.send(500, err);
        } else {
          models.Map.makeMap(
            data[0],
            req.body.lat,
            req.body.long,
            (err, mapData) => {
              if (err) {
                res.send(500, err);
              } else {
                res.send(200, data);
              }
            }
          );
        }
      });
    }
  });
};

module.exports.joinEvent = (req, res) => {
  console.log('JOIN EVENT REQ.BODY:', req.body);
  models.Events.joinEvent(
    req.body.eventId,
    req.body.userId,
    (type = 'attendee'),
    (err, data) => {
      if (err) {
        console.log('ERR FROM CONTROLLERS/EVENTS:', err);
        res.send(500, err);
      } else {
        models.Events.incrementAttendeeCount(req.body.eventId, (err, data) => {
          if (err) {
            res.send(500, err);
          } else {
            res.send(200, data);
          }
        });
        res.send(200, data);
      }
    }
  );
};

module.exports.leaveEvent = (req, res) => {
  console.log('LEAVE EVENT REQ.BODY:', req.body);
  models.Events.leaveEvent(req.body.eventId, req.body.userId, (err, data) => {
    if (err) {
      console.log('ERR FROM CONTROLLERS/EVENTS:', err);
      res.send(500, err);
    } else {
      models.Events.decrementAttendeeCount(req.body.eventId, (err, data) => {
        if (err) {
          res.send(500, err);
        } else {
          res.send(200, data);
        }
      });
      res.send(200, data);
    }
  });
};

module.exports.getAllEvents = (req, res) => {
  //testing this out to see if events are being received

  models.Events.findAllEvents((err, allEvents) => {
    if (err) {
      res.send(500, err);
    } else {
      models.User.getEventIdForAllOrganizers((err, allOrganizers) => {
        if (err) {
          res.send(500, err);
        } else {
          models.Map.allMaps((err, allMaps) => {
            if (err) {
              res.send(500, err);
            } else {
              console.log('ALL EVENTS CONTROLLER: ', allEvents);
              const output = formatEvents(allEvents, allOrganizers, allMaps);
              res.send(200, output);
            }
          });
        }
      });
    }
  });
};

module.exports.updateEvent = (req, res) => {
  models.Events.updateEventById(req.body, (err, data) => {
    if (err) {
      res.send(500, err);
    } else {
      res.send(200, data);
    }
  });
};

module.exports.deleteEvent = (req, res) => {
  models.Events.deleteEventById(req.query.eventId, (err, data) => {
    console.log('DELETE EVENT SERVER REQ.BODY', req.query);
    if (err) {
      console.log('DELETE EVENT ERROR FROM SERVER', err);
      res.send(500, err);
    } else {
      res.send(200, data);
    }
  });
};

module.exports.getAllUsersForEvent = (req, res) => {
  console.log(req.query, req.params);
  models.Events.findAllUsersForEvent(req.query.eventId, (err, allUsers) => {
    if (err) {
      res.send(500, err);
    } else {
      const users = formatUsers(allUsers);
      res.send(200, users);
    }
  });
};

