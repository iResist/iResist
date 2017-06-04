const models = require('../../db/models');

module.exports.createEvent = (req, res) => {

  models.Events.createEvent(req.body, (err, data) => {
    if (err) {
      res.send(500, err);
    } else {
      models.User.createEvent(data[0], req.body.userId, (err, data) => {
        if (err) {
          res.send(500, err) 
        } else {
          models.Map.makeMap(data[0], req.body.lat, req.body.long, (err, mapData) => {
            if (err) {
              res.send(500, err) 
            } else {
              res.send(200, data)
            }
          })
        }
      })
    }
  })
}

module.exports.joinEvent = (req, res) => {
  console.log('JOIN EVENT REQ.BODY:', req.body);
}

module.exports.getAllEvents = (req, res) => { //testing this out to see if events are being received
  console.log('THESE ARE ALL THE EVENT: ', res.body)

  models.Events.findAllEvents(res.body, (err, data) => {
    if (err) {
      res.send(500, err);
    } else {
      res.send(200, data);
    }
  })
}
