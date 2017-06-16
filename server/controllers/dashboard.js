const models = require('../../db/models');
const format = require('../../db/lib/formatDashboard.js');

module.exports.getDashboard = (req, res) => {
  const userId = req.query.id || 6;

  models.Events.findAllEvents((err, allEvents) => {
    if (err) {
      console.log('FAILED ON FINDALLEVENTS');
      res.send(500, err);
    } else {
      models.Events.findAllAttendees((err, allAttendees) => {
        if (err) {
          console.log('FAILED ON FINALLATTENDEES');
          res.send(500, err);
        } else {
          models.Map.allMaps((err, allMaps) => {
            if (err) {
              console.log('FAILED ON ALLMAPS');
              res.send(500, err);
            } else {
              models.Feed.allFeeds((err, allFeeds) => {
                if (err) {
                  console.log('FAILED ON ALLFEEDS');
                  res.send(500, err);
                } else {
                  models.User.allUsers((err, allUsers) => {
                    if (err) {
                      console.log('FAILED ON ALLUSERS');
                      res.send(500, err);
                    } else {
                      models.Map.allMaps((err, allMaps) => {
                        if (err) {
                          console.log('FAILED ON ALLMAPS2');
                          res.send(500, err);
                        } else {
                          models.User.user(userId, (err, userData) => {
                            if (err) {
                              console.log('FAILED ON USER');
                              res.send(500, err);
                            } else {
                  
                              var response = {
                                allEvents: allEvents,
                                allAttendees: allAttendees,
                                allMaps: allMaps,
                                allFeeds: allFeeds,
                                allUsers: allUsers,
                                user: userData
                              };
                              res.send(200, format(response));
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};
